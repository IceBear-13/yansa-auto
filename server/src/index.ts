import express from "express";
import dotenv from "dotenv";
import { db } from "./db/db";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


const database = db;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})