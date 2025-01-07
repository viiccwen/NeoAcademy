import express from 'express';
import cors from 'cors';
import userRouter from 'routers/user-router';
import authRouter from 'routers/auth-router';
import quizRouter from 'routers/quiz-router';
import { ChatOpenAI } from '@langchain/openai';


const API_PORT = process.env.API_PORT ?? 3000;
const app = express();
export const model = new ChatOpenAI({ model: "gpt-4o-mini" });


app.use(cors());
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', quizRouter);

app.listen(API_PORT, () => {
    console.log(`Server is running on port ${API_PORT}`);
});
