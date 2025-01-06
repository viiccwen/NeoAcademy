import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { deleteUser, getUser } from 'controllers/user-controller';


const userRouter = Router();

userRouter.get('/user', authMiddleware, getUser);

userRouter.delete('/user', authMiddleware, deleteUser);


export default userRouter;
