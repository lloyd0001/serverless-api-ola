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

connect(dbCloudUrl || dbLocalUrl)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api', router);
export const handler = serverless(app);