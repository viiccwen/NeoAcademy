import authMiddleware from "middlewares/auth-middleware";
import { Router } from "express";
import {
  createQuiz,
  deleteQuiz,
  getAllQuiz,
  getQuizById,
  submitQuiz,
} from "controllers/quiz-controller";
import validateBodyMiddleware from "middlewares/validate-body-middleware";
import { createQuizSchema, submitQuizSchema } from "schemas/quiz";

const quizRouter = Router();

quizRouter.get("/quiz", authMiddleware, getAllQuiz);

quizRouter.get("/quiz/:quizId", authMiddleware, getQuizById);

quizRouter.post(
  "/quiz",
  authMiddleware,
  validateBodyMiddleware(createQuizSchema),
  createQuiz
);

quizRouter.put(
  "/quiz/:quizId",
  authMiddleware,
  validateBodyMiddleware(submitQuizSchema),
  submitQuiz
);

quizRouter.delete("/quiz/:quizId", authMiddleware, deleteQuiz);

export default quizRouter;
