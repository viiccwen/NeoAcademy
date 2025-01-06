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
      const quiz = user.quizzes.find(({ _id }) => _id.toString() === quizId);

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
  if(!_quiz) {
    throw new Error("Quiz not found.");
  }
};
