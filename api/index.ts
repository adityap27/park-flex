import express, { Request, Response } from "express";
import cors from 'cors';
import router from './src/routes/index';
import dotenv from 'dotenv'; // Import dotenv

// Load environment variables from .env file
dotenv.config();

import { dataBase } from "./src/dao/connection"; // Make sure to import this after dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
