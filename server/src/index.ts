import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "./db/db";
import { router } from "./routes";
import cors from 'cors';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(
    {
        origin: ['http://localhost:5173', 'http://35.78.221.49', 'http://ec2-35-78-221-49.ap-northeast-1.compute.amazonaws.com'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));

app.use('/api', router);



app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is running" });
});

const database = db;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})