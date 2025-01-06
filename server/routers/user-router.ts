import authMiddleware from 'middlewares/auth-middleware';
import { Router } from 'express';
import { deleteUser, getUserProfile } from 'controllers/user-controller';


const userRouter = Router();

userRouter.get('/user', authMiddleware, getUserProfile);
userRouter.delete('/user', authMiddleware, deleteUser);


export default userRouter;
