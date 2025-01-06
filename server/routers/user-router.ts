import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { deleteUser } from 'controllers/user-controller';
import type { User } from 'database';


const userRouter = Router();

userRouter.get('/user', authMiddleware, (req, res) => {
    console.log('req.user:', req.user);
    const { name, email } = req.user! as User;

    res.status(200).json({ name, email });
});

userRouter.delete('/user', authMiddleware, async (req, res) => {
    try {
        await deleteUser(req.user!);
        res.status(204).end();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error!' });
    } 
});


export default userRouter;
