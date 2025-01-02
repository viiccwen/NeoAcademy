import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { deleteUser } from 'controllers/user-controller';


const userRouter = Router();

userRouter.get('/user', authMiddleware, (req, res) => {
    const { name, email } = req.user!;

    res.status(200).json({ name, email });
});

userRouter.delete('/user', authMiddleware, async (req, res) => {
    await deleteUser(req.user!);
    res.status(204).end();
});


export default userRouter;
