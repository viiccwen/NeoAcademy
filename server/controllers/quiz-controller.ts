import type { Request, Response } from "express";
import { ChatOpenAI } from "@langchain/openai";

import type {
  getAllQuizType,
  Quiz,
  UnansweredQuestion,
  UnansweredQuiz,
  User,
} from "database";

import { users } from "database";
import { ObjectId } from "mongodb";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getQuiz } from "utils/quiz";

const model = new ChatOpenAI({ model: "gpt-4o-mini" });

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

export async function generateUnansweredQuiz(
  name: string,
  category: string,
  difficulty: string,
  option: number,
  question: number,
  multipleAnswers: boolean,
  remarks: string
): Promise<UnansweredQuiz> {
  const systemMessage = formatSystemMessage(option, question, multipleAnswers);
  const humanMessage = formatHumanMessage(name, category, difficulty, remarks);
  const aiMessage = await model.invoke([systemMessage, humanMessage]);

  return {
    _id: new ObjectId(),
    name,
    category,
    difficulty,
    multipleAnswers,
    answered: false,
    questions: JSON.parse(aiMessage.content.toString()) as UnansweredQuestion[],
    createdAt: new Date(),
  };
}

function formatSystemMessage(
  option: number,
  question: number,
  multipleAnswers: boolean
): SystemMessage {
  return new SystemMessage(
    `You are a quiz generator.
 You will generate ${question} questions in total, and each question will have ${option} options. 
 Every question is a ${multipleAnswers ? "single" : "multiple"}-choice question.
 You will return an array of objects in JSON format, each object correspond to a question.
 The question object will look like:
 \`\`\`json{
    "text": "the text of the question",
    "options": ["text of option 0", "text of option 1", ..., "text of option n"],
    "answer": [numbers of the correct options]
 }\`\`\`
Return the JSON string without line breaks and code block.`
  );
}

function formatHumanMessage(
  name: string,
  category: string,
  difficulty: string,
  remarks: string
): HumanMessage {
  return new HumanMessage(
    `Title of the quiz: ${name}.
Category of the quiz: ${category}.
Difficulty of the quiz: ${difficulty}.
Remarks: "${remarks}"`
  );
}

export async function recordUnansweredQuiz(
  { _id }: User,
  quiz: UnansweredQuiz
): Promise<void> {
  await users.updateOne({ _id }, { $push: { quizzes: quiz } });
}

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
