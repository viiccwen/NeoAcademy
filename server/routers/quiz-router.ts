import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { createQuiz, deleteQuiz, getAllQuiz, getQuizById } from 'controllers/quiz-controller';
import validateBodyMiddleware from 'middlewares/validate-body-middleware';
import { createQuizSchema, submitQuizSchema } from 'schemas/quiz';


const quizRouter = Router();

quizRouter.get('/quiz', authMiddleware, getAllQuiz);

quizRouter.get('/quiz/:quizId', authMiddleware, getQuizById);

quizRouter.post('/quiz', authMiddleware, validateBodyMiddleware(createQuizSchema), createQuiz);

quizRouter.put('/quiz/:quizId', authMiddleware, validateBodyMiddleware(submitQuizSchema), async (req, res) => {
    // try {
    //     const quiz = getQuiz(req.user!, req.params.quizId);
    //     if (!quiz) {
    //         res.status(404).json({ message: 'Quiz not found.' });
    //         return;
    //     }
    //     res.status(200).json(await submitAndGetAnswers(quiz, req.body));
    // } catch (e) {
    //     console.error(e);
    //     res.status(500).json({ message: 'Error!' });
    // }
});

quizRouter.delete('/quiz/:quizId', authMiddleware, async (req, res) => {
    try {
        await deleteQuiz(req.user!, req.params.quizId);
        res.status(204).end();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error!' });
    }
});


export default quizRouter;
