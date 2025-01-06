import type { RequestHandler } from 'express';
import { sign } from 'jsonwebtoken';


export const handleOAuthCallback: RequestHandler = (req, res): void => {
    const { authProvider: provider, accessToken } = req.user!;
    const token = sign({ provider, accessToken }, process.env.JWT_SECRET!, {
      algorithm: 'HS256',
      expiresIn: '12h',
    });

    res.redirect(`${process.env.AUTH_REDIRECT_URL}?token=${token}`);
};
