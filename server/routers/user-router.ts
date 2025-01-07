import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { analyzeUser, deleteUser, getUser } from 'controllers/user-controller';


const userRouter = Router();

userRouter.get('/user', authMiddleware, getUser);

userRouter.get('/user/analyze', authMiddleware, analyzeUser);

userRouter.delete('/user', authMiddleware, deleteUser);


export default userRouter;
