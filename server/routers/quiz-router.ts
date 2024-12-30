import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { generateUnansweredQuiz, recordUnansweredQuiz, submitAndGetAnswers } from 'controllers/quiz-controller';


const quizRouter = Router();

quizRouter.post('/quiz', authMiddleware, async (req, res) => {
    const { name, category, difficulty, option, problem, mul_answer: mulAnswer, remarks } = req.body;
    const unansweredQuiz = await generateUnansweredQuiz(name, category, difficulty, option, problem, mulAnswer, remarks);
    await recordUnansweredQuiz(req.user!, unansweredQuiz);

    res.status(200).json({ id: unansweredQuiz._id, problems: unansweredQuiz.problems });
});

quizRouter.put('/quiz', authMiddleware, async (req, res) => {
    const { id, answers } = req.body;

    res.status(200).json(await submitAndGetAnswers(req.user!, id, answers));
});


export default quizRouter;
