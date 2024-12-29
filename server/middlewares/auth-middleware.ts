import type { RequestHandler } from 'express';
import { User } from 'models/user';

import { verify } from 'utils/verify';


const authMiddleware: RequestHandler = async (req, res, next) => {
    if (!req.headers.authorization?.startsWith('Bearer')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const token = req.headers.authorization.split(' ')[1];
    const accessToken = await verify(token) as string;

    req.user = await User.findOne({ accessToken }) ?? undefined;
    next();
};


export default authMiddleware;
