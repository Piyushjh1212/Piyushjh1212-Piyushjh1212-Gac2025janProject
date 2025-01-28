import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import userRouter from './routes/userRoute.js';
dotenv.config();

// Dot env file
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;
console.log(mongo_url);

const app = express();

// Database connection
connectDb(mongo_url);

// middleware setup
app.use(express.json());
app.use(cors());


// Routes

app.use("/api/users", userRouter);


app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.listen(port, () => {
    console.log("Server started at http://localhost:5000");
});