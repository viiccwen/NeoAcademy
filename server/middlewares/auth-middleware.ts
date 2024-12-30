import { findByOAuth } from 'controllers/user-controller';
import type { RequestHandler } from 'express';

import { verify } from 'utils/verify';


const authMiddleware: RequestHandler = async (req, res, next) => {
    if (!req.headers.authorization?.startsWith('Bearer')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const { provider, accessToken } = await verify(token) as any;
    const user = await findByOAuth(provider, accessToken);

    if (!user) {
        res.status(500).json({ message: 'Not found' });
        return;
    }

    req.user = user;
    next();
};


export default authMiddleware;
