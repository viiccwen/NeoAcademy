import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { generateQuiz } from 'controllers/quiz-controller';


const userRouter = Router();

userRouter.get('/quiz', authMiddleware, async (req, res) => {
    const { name, category, difficulty, option, problem, mul_answer: mulAnswer, remarks } = req.body;
    res.status(200).json(generateQuiz());
});

quizRouter.put('/quiz', authMiddleware, async (req, res) => {
    answerQuiz()
});


export default userRouter;
