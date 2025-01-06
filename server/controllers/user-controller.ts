import type { RequestHandler } from 'express';
import { deleteUserById } from 'utils/user';


export const getUserProfile: RequestHandler = (req, res) => {
    const { name, email } = req.user!;

    res.status(200).json({ name, email });
};

export const deleteUser: RequestHandler = async (req, res) => {
    try {
        await deleteUserById(req.user!._id);
        res.status(204).end();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error!' });
    } 
};
