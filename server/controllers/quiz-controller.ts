import type { RequestHandler } from 'express';
import { deleteQuizById, generateUnansweredQuiz, getQuizById, recordUnansweredQuiz, submitAndGetAnswers } from 'utils/quiz';


export const getQuizzes: RequestHandler = (req, res) => {
    const quizzes = req.user!.quizzes.map(({ _id, name, category, difficulty, multipleAnswers, answered, createdAt }) =>
                                          ({ id: _id, name, category, difficulty, multipleAnswers, answered, createdAt }));
    
    res.status(200).json(quizzes);
};

export const getQuizDetails: RequestHandler = (req, res) => {
    const quiz = getQuizById(req.user!, req.params.quizId);

    if (!quiz) {
        res.status(404).json({ message: 'Quiz not found.' });
        return;
    }

    const { _id: id, name, category, difficulty, multipleAnswers, answered, questions, remarks, createdAt } = quiz;
    res.status(200).json({ id, name, category, difficulty, multipleAnswers, answered, questions, remarks, createdAt });
};

export const generateQuiz: RequestHandler = async (req, res) => {
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
};

export const submitQuiz: RequestHandler = async (req, res) => {
    try {
        const quiz = getQuizById(req.user!, req.params.quizId);
        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found.' });
            return;
        }
        res.status(200).json(await submitAndGetAnswers(quiz, req.body));
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error!' });
    }
}

export const deleteQuiz: RequestHandler = async (req, res) => {
    try {
        await deleteQuizById(req.user!, req.params.quizId);
        res.status(204).end();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error!' });
    }
}
