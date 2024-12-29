import type { RequestHandler } from 'express';

import prisma from 'client';


export const getUser: RequestHandler = async (req, res): Promise<void> => {
    const user = req.user!;
    res.status(200).json({
        email: user.email,
        problems: user.problems
    });
};

export const deleteUser: RequestHandler = async (req, res): Promise<void> => {
    prisma.user.delete({
        where: { id: req.user!.id }
    });
    res.status(204).end();
};


export function getUser() {

}
