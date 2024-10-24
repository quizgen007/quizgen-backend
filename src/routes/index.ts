import { Router } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import quizRouter from './quizRouter';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/quiz', authMiddleware, quizRouter);

export default router;