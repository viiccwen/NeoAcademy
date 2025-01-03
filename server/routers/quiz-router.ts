import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { deleteQuiz, generateUnansweredQuiz, getQuiz, recordUnansweredQuiz, submitAndGetAnswers } from 'controllers/quiz-controller';


const quizRouter = Router();

quizRouter.get('/quiz', authMiddleware, (req, res) => {
    const quizzes = req.user!.quizzes.map(({ _id, name, category, difficulty, multipleAnswers, answered, createdAt }) =>
                                          ({ id: _id, name, category, difficulty, multipleAnswers, answered, createdAt }));
    
    res.status(200).json(quizzes);
});

quizRouter.get('/quiz/:quizId', authMiddleware, (req, res) => {
    const quiz = getQuiz(req.user!, req.params.quizId);

    if (!quiz) {
        res.status(404).json({ message: 'Not found' });
        return;
    }

    const { _id: id, name, category, difficulty, multipleAnswers, answered, questions, remarks, createdAt } = quiz;
    res.status(200).json({ id, name, category, difficulty, multipleAnswers, answered, questions, remarks, createdAt });
});

quizRouter.post('/quiz', authMiddleware, async (req, res) => {
    const { name, category, difficulty, option, question, multipleAnswers, remarks } = req.body;
    const unansweredQuiz = await generateUnansweredQuiz(name, category, difficulty, option, question, multipleAnswers, remarks);
    await recordUnansweredQuiz(req.user!, unansweredQuiz);

    const questions = unansweredQuiz.questions.map(({ text, options }) => ({ text, options }));
    res.status(200).json({ id: unansweredQuiz._id, questions });
});

quizRouter.put('/quiz/:quizId', authMiddleware, async (req, res) => {
    try {
        res.status(200).json(await submitAndGetAnswers(req.user!, req.params.quizId, req.body));
    } catch (_) {
        res.status(404).json({ message: 'Not found' });
    }
});

quizRouter.delete('/quiz/:quizId', authMiddleware, async (req, res) => {
    await deleteQuiz(req.user!, req.params.quizId);
    res.status(204).end();
});


export default quizRouter;
