import type { RequestHandler } from 'express';

import { findByOAuth } from 'controllers/user-controller';
import { verify } from 'utils/verify';
import type { jwtType } from 'utils/type';


const authMiddleware: RequestHandler = async (req, res, next) => {
    if (!req.headers.authorization?.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized.' });
        return;
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        const { payload, iat, exp } = await verify(token) as jwtType;

        const user = await findByOAuth(payload.provider, payload.accessToken);

        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error!' });
    }
};


export default authMiddleware;
