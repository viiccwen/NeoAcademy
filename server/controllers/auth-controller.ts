import type { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import type { PayloadType } from "utils/type";


export const authCallback = (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const payload: PayloadType = {
      provider: user.authProvider,
      authId: user.authId,
    };

    const token = sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.redirect(`${process.env.AUTH_REDIRECT_URL!}/${token}`);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
