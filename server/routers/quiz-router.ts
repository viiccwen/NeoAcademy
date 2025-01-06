import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { deleteQuiz, generateUnansweredQuiz, getAllQuiz, recordUnansweredQuiz, submitAndGetAnswers } from 'controllers/quiz-controller';
import validateBodyMiddleware from 'middlewares/validate-body-middleware';
import { createQuizSchema, submitQuizSchema } from 'schemas/quiz';


const quizRouter = Router();

quizRouter.get('/quiz', authMiddleware, getAllQuiz);

quizRouter.get('/quiz/:quizId', authMiddleware, (req, res) => {
    // const quiz = getQuiz(req.user!, req.params.quizId);

    // if (!quiz) {
    //     res.status(404).json({ message: 'Quiz not found.' });
    //     return;
    // }

    // const { _id: id, name, category, difficulty, multipleAnswers, answered, questions, remarks, createdAt } = quiz;
    // res.status(200).json({ id, name, category, difficulty, multipleAnswers, answered, questions, remarks, createdAt });
});

quizRouter.post('/quiz', authMiddleware, validateBodyMiddleware(createQuizSchema), async (req, res) => {
    try {
        const { name, category, difficulty, option, question, multipleAnswers, remarks } = req.body;
        const unansweredQuiz = await generateUnansweredQuiz(name, category, difficulty, option, question, multipleAnswers, remarks ?? '');
        await recordUnansweredQuiz(req.user!, unansweredQuiz);

        const questions = unansweredQuiz.questions.map(({ text, options }) => ({ text, options }));
        res.status(200).json({ id: unansweredQuiz._id, questions });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error!' });
    }
});

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
