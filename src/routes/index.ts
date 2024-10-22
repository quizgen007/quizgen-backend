import { Router } from 'express';
import userController from '../controllers/userController';

const router = Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);

export default router;