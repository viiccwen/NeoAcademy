import type { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import type { PayloadType } from 'types/auth';


export const authCallback = (req: Request, res: Response) => {
    try {
        const user = req.user!;

        const payload: PayloadType = {
            provider: user.authProvider,
            authId: user.authId,
        };

<<<<<<< HEAD
    const token = sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.redirect(`${process.env.AUTH_REDIRECT_URL!}/${token}`);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
=======
        const token = sign(payload, process.env.JWT_SECRET!, {
            expiresIn: '10s',
        });
        const expiry = (Date.now() + 12 * 60 * 60 * 1000).toString();

        res.redirect(`${process.env.AUTH_REDIRECT_URL!}/${token}/${expiry}`);
    } catch (e: any) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
>>>>>>> 2f984ed (slight refactor)
};
