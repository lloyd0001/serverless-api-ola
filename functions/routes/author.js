const express = require('express');
const AuthorModel = require('../models/author');

const router = express.Router();

//GET all authors
router.get('/', async (req, res) => {
    try {
        const authors = await AuthorModel.find();
        res.json(authors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//GET a single author
router.get('/:id', getAuthor, (req, res) => {
    res.json(res.author);
});


// CREATE an author
router.post('/', async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name || !req.body.age) {
            return res.status(400).json({ message: 'Name and age are required' });
        }

        // Check if the author's name already exists
        const existingAuthor = await AuthorModel.findOne({ name: req.body.name });
        if (existingAuthor) {
            return res.status(400).json({ message: 'Author already exists' });
        }

        // Create a new AuthorModel instance with req.body and save to database
        const newAuthor = new AuthorModel({
            name: req.body.name,
            age: req.body.age,
            // Add other fields as needed from req.body
        });

        const savedAuthor = await newAuthor.save();
        
        res.status(201).json({ message: 'Author created successfully', author: savedAuthor });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



//UPDATE an author
router.patch('/:id', getAuthor, async (req, res) => {
    try {
        if (req.body.name != null) {
            res.author.name = req.body.name;
        }
        const updatedAuthor = await res.author.save();
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', getAuthor, async (req, res) => {
    try {
        
        if (req.body.name != null) {
            res.author.name = req.body.name;
        }
        if (req.body.age != null) {
            res.author.age = req.body.age;
        }
        
        const updatedAuthor = await res.author.save();
        res.json(updatedAuthor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


//DELETE an author
router.delete('/:id', getAuthor, async (req, res) => {
    try{
        await AuthorModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Author deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE an author
router.delete('/:id', getAuthor, async (req, res) => {
    try {
        await res.author.remove();
        res.json({ message: 'Author deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Middleware function to get a single author by ID
async function getAuthor(req, res, next) {
    try{
        const author = await AuthorModel.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.author = author;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

module.exports = router;
