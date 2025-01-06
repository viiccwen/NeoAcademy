import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import validateBodyMiddleware from 'middlewares/validate-body-middleware';
import { createQuizSchema, submitQuizSchema } from 'schemas/quiz';
import { deleteQuiz, generateQuiz, getQuizDetails, getQuizzes, submitQuiz } from 'controllers/quiz-controller';


const quizRouter = Router();

quizRouter.get('/quiz', authMiddleware, getQuizzes);
quizRouter.get('/quiz/:quizId', authMiddleware, getQuizDetails);
quizRouter.post('/quiz', authMiddleware, validateBodyMiddleware(createQuizSchema), generateQuiz);
quizRouter.put('/quiz/:quizId', authMiddleware, validateBodyMiddleware(submitQuizSchema), submitQuiz);
quizRouter.delete('/quiz/:quizId', authMiddleware, deleteQuiz);


export default quizRouter;
