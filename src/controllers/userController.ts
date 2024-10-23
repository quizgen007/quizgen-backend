import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

export default { getAllUsers };