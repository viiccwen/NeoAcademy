import type { Request, Response } from "express";

import type { Quiz, UnansweredQuestion, UnansweredQuiz, User } from "database";

import { users } from "database";
import { ObjectId } from "mongodb";
import { generateQuiz, getQuiz, recordQuiz } from "utils/quiz";
import { unknown, type z } from "zod";
import type { createQuizSchema } from "schemas/quiz";
import type { getAllQuizType } from "utils/type";

export const getAllQuiz = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const quizzes = getQuiz(user) as getAllQuizType;

    if (!quizzes) throw new Error("找不到任何測驗！");

    res.status(200).json(quizzes);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "發生錯誤！" });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const user = req.user!;
    const quiz = getQuiz(user, req.params.quizId);

    if (!quiz) throw new Error("找不到測驗！");

    res.status(200).json(quiz);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "發生錯誤！" });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      difficulty,
      option,
      question,
      multipleAnswers,
      remarks,
    } = req.body as z.infer<typeof createQuizSchema>;
    const { _id } = req.user!;

    // genearate quiz
    const quiz = {
      _id: new ObjectId(),
      name,
      category,
      difficulty,
      questions: [
        {
          text: "What is the formula for water?",
          options: ["H2O", "CO2", "O2", "H2SO4"],
          answer: [0, 2, 3],
        },
        {
          text: "Who discovered gravity?",
          options: ["Einstein", "Newton", "Galileo", "Tesla"],
          answer: [1],
        },
        {
          text: "What is the closest planet to the sun?",
          options: ["Earth", "Mars", "Mercury", "Venus"],
          answer: [2],
        },
        {
          text: "What is the largest mammal?",
          options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
          answer: [1],
        },
        {
          text: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Lysosome"],
          answer: [1],
        },
      ],
      multipleAnswers,
      remarks: remarks ?? "",
      answered: false as false,
      createdAt: new Date(),
    };

    // todo: already tested, remove this at last
    // const quiz = await generateQuiz(
    //   name,
    //   category,
    //   difficulty,
    //   option,
    //   question,
    //   multipleAnswers,
    //   remarks ?? ""
    // );

    // record quiz
    await recordQuiz<UnansweredQuiz>(_id, quiz);

    const questions = quiz.questions.map(({ text, options }) => ({
      text,
      options,
    }));

    res.status(200).json({ id: quiz._id, questions });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "發生錯誤！" });
  }
};

export async function submitAndGetAnswers(
  quiz: Quiz | UnansweredQuiz,
  responses: number[][]
): Promise<{ index: number; answer: number[]; response: number[] }[]> {
  quiz.answered = true;
  quiz.questions = quiz.questions.map(({ text, options, answer }, i) => ({
    text,
    options,
    answer,
    response: responses[i],
  }));

  await users.updateOne(
    { "quizzes._id": new ObjectId(quiz._id) },
    { $set: { "quizzes.$": quiz } }
  );

  const answers = quiz.questions.map((question) => question.answer);
  const incorrectProblems = [];
  for (let i = 0; i < answers.length; i++) {
    if (responses[i].some((x, j) => answers[i][j] != x))
      incorrectProblems.push({
        index: i,
        answer: answers[i],
        response: responses[i],
      });
  }
  return incorrectProblems;
}

export async function deleteQuiz(user: User, quizId: string): Promise<void> {
  await users.updateOne(
    { _id: user._id },
    { $pull: { quizzes: { _id: new ObjectId(quizId) } } }
  );
}
