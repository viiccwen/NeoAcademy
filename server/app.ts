import express from 'express';
import cors from 'cors';
import userRouter from 'routers/user-router';
import authRouter from 'routers/auth-router';
import problemRouter from 'routers/problem-router';
import mongoose from 'mongoose';


await mongoose.connect(process.env.DATABASE_URL!, { autoIndex: true });


const API_PORT = process.env.API_PORT ?? 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', problemRouter);

app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT}`);
});
