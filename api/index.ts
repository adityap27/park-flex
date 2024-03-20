import express, { Request, Response } from "express"
import { dataBase } from "./src/dao/connection";
// import multer from 'multer';
import cors from 'cors';
import router from './src/routes/index';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
})

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});