import type {
  AIMessageChunk,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { model } from "app";
import type { RequestHandler } from "express";
import type { Request, Response } from "express";
import {
  formatAnalysisHumanMessage,
  formatAnalysisSystemMessage,
} from "utils/message";
import { deleteUserById } from "utils/user";

export const getUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.user!;

    res.status(200).json({ name, email });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "發生未知錯誤！" });
  }
};

export const analyzeUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { quizzes } = req.user!;

    const quiz = quizzes.filter((q) => q.answered);

    const systemMessage: SystemMessage = formatAnalysisSystemMessage();
    const humanMessage: HumanMessage = formatAnalysisHumanMessage(quiz);
    const aiMessage: AIMessageChunk = await model.invoke([
      systemMessage,
      humanMessage,
    ]);

    const contents = aiMessage.content.toString();

    res.status(200).send(contents);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "發生未知錯誤！" });
  }
};

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { _id } = req.user!;
    const result = await deleteUserById(_id);

    if (!result.deletedCount) throw new Error("找不到使用者！");

    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "發生未知錯誤！" });
  }
};
