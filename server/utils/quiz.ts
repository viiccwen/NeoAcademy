import {
  users,
  type Quiz,
  type UnansweredQuestion,
  type UnansweredQuiz,
  type User,
} from "database";
import type { getAllQuizType } from "./type";
import {
  AIMessageChunk,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { formatHumanMessage, formatSystemMessage } from "utils/message";
import { ChatOpenAI } from "@langchain/openai";
import { ObjectId } from "mongodb";

const model = new ChatOpenAI({ model: "gpt-4o-mini" });

export function getQuiz(
  user: User,
  quizId?: string | undefined
): Quiz | getAllQuizType | UnansweredQuiz | Quiz[] | undefined {
  try {
    if (quizId) {
      // single quiz search
      const _quiz = user.quizzes.find(({ _id }) => _id.toString() === quizId);

      if (!_quiz) {
        throw new Error("找不到測驗！");
      }

      const quiz = {
        id: _quiz._id.toString(),
        ..._quiz,
      };

      return quiz;
    } else {
      // multiple quiz search
      const quizzes = user.quizzes.map(
        ({ _id, name, category, difficulty, multipleAnswers, createdAt }) => ({
          id: _id.toString(),
          name,
          category,
          difficulty,
          multipleAnswers,
          createdAt,
        })
      );

      return quizzes;
    }
  } catch (error) {
    console.error("Error retrieving quiz:", error);
    return undefined;
  }
}

export async function generateQuiz(
  name: string,
  category: string,
  difficulty: string,
  option: number,
  question: number,
  multipleAnswers: boolean,
  remarks: string
): Promise<UnansweredQuiz> {
  const systemMessage: SystemMessage = formatSystemMessage(
    option,
    question,
    multipleAnswers
  );
  const humanMessage: HumanMessage = formatHumanMessage(
    name,
    category,
    difficulty,
    remarks
  );
  const aiMessage: AIMessageChunk = await model.invoke([
    systemMessage,
    humanMessage,
  ]);

  const questions = JSON.parse(
    aiMessage.content.toString()
  ) as UnansweredQuestion[];

  return {
    _id: new ObjectId(),
    name,
    category,
    difficulty,
    multipleAnswers,
    questions,
    answered: false,
    createdAt: new Date(),
  };
}

export const recordQuiz = async <T extends Quiz | UnansweredQuiz>(
  _id: ObjectId,
  quiz: T
) => {
  const _quiz = await users.updateOne({ _id }, { $push: { quizzes: quiz } });
  if (!_quiz) {
    throw new Error("Quiz not found.");
  }
};

export const submitAnswer = async (
  user: User,
  quizId: string,
  responses: number[][]
) => {
  try {
    // get the quiz index
    const quizIndex = user.quizzes.findIndex(
      (q) => q._id.toString() === quizId
    );
    if (quizIndex === -1) throw new Error("找不到測驗！");

    // get the quiz
    const quiz = user.quizzes[quizIndex];

    // mark the quiz as answered
    quiz.answered = true;

    // update the responses
    quiz.questions = quiz.questions.map(({ text, options, answer }, i) => ({
      text,
      options,
      answer,
      response: responses[i] ?? [], // 避免 undefined 錯誤
    }));

    // update the quiz
    const result = await users.updateOne(
      { "quizzes._id": new ObjectId(quizId) },
      { $set: { [`quizzes.${quizIndex}`]: quiz } }
    );

    if (!result) {
      throw new Error("測驗更新失敗，請重試。");
    }

    return quiz;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "發生不知名錯誤！");
  }
};

export const getInccorectQuestions = async (quiz: Quiz) => {
  const answers = quiz.questions.map((question) => question.answer);
  const responses = quiz.questions.map((question) => question.response);
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
};
