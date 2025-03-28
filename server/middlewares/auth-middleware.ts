import type { RequestHandler } from 'express';
import { verify } from 'utils/verify';
import type { JwtType } from 'types/auth';
import { findByOAuthId } from 'utils/user';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const authMiddleware: RequestHandler = async (req, res, next) => {
    if (!req.headers.authorization?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const payload = (await verify(token)) as JwtType;
        const user = await findByOAuthId(payload.provider, payload.authId);

        if (!user) {
            res.status(401).json({ message: 'Unauthorized.' });
            return;
        }

        req.user = user;
        next();
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            res.status(401).json({ message: 'Unauthorized.' });
        } else if (e instanceof JsonWebTokenError) {
            res.status(404).json({ message: 'Invalid JWT.' });
        } else {
            console.error(e);
            res.status(500).json({ message: 'Error!' });
        }
    }
};

export default authMiddleware;
