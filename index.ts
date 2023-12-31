import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import router from './routes/routes';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

const dbUrl: string = 'mongodb://127.0.0.1/logic';

const database = mongoose.connect(dbUrl);

database.then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome !');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.use('/api/auth', router);
