import type { RequestHandler } from "express";
import type { Request, Response } from "express";
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

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.user!;
    const result = await deleteUserById(id);

    if (!result.deletedCount) throw new Error("找不到使用者！");

    res.sendStatus(200);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "發生未知錯誤！" });
  }
};
