const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');
const router = require('./routes/author');

const app = express();
// mongoDB Cloud URL
const dbCloudUrl ='mongodb+srv://johnlloyd15:1234@cluster0.0ycwtxv.mongodb.net/';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose
  .connect(dbCloudUrl || dbLocalUrl)
  .then(() => {
    console.log('Connected to MongoDB'
  )})
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

  app.listen(port, () =>
    console.log(`Listening on port http://localhost:${port}`)
  );

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
