import type { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import type { payloadType } from "utils/type";

export const githubAuthCallback = (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const payload: payloadType = {
      provider: user.authProvider,
      authId: user.authId,
    }
    
    const token = sign({ payload }, process.env.JWT_SECRET!, {
      expiresIn: "12h",
    });

    res.redirect(`${process.env.AUTH_REDIRECT_URL!}/${token}`);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};

export const googleAuthCallback = (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const payload: payloadType = {
      provider: user.authProvider,
      authId: user.authId,
    }
    
    const token = sign({ payload }, process.env.JWT_SECRET!, {
      expiresIn: "12h",
    });

    res.redirect(`${process.env.AUTH_REDIRECT_URL!}/${token}`);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};
