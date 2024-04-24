import express, { json, urlencoded } from 'express';
import serverless from 'serverless-http';
import router from './routes/author';
import { connect } from 'mongoose';
import cors from 'cors';

const app = express();

const dbCloudUrl = 
'mongodb+srv://johnlloyd15:QyOwQvnki75ZaAvP@cluster0.0ycwtxv.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

mongoose
  .connect(dbCloudUrl)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err)
  })
app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app)