import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { userSchema } from '../validators/userValidator';
import { ValidationError, ConflictError } from '../errors';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedBody = await userSchema.validateAsync(req.body);
        const user = new User(validatedBody);
        await user.save();
        res.status(201).json({ user });
    } catch (error: any) {
        if (error.isJoi) {
            // Joi validation error
            next(new ValidationError(error.details[0].message));
        } else if (error.code === 11000) {
            // MongoDB duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            next(new ConflictError(`An account with that ${field} already exists.`));
        } else {
            next(error);
        }
    }
};

const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
};

export default { createUser, getAllUsers };