import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';
import { OAuth2Client } from 'google-auth-library';
import { authTokenSchema } from '../validators/authValidator';
import { ValidationError } from '../errors';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { userSchema } from '../validators/userValidator';

dotenv.config();

const env = cleanEnv(process.env, {
    GOOGLE_CLIENT_ID: str(),
    JWT_SECRET: str(),
});

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = await authTokenSchema.validateAsync(req.body);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new ValidationError('Invalid Google token');
        }

        const { sub: googleId, email, name } = payload;

        let user = await User.findOne({ email });
        if (!user) {
            const validatedBody = await userSchema.validateAsync({ googleId, email, name });
            user = new User(validatedBody);
            await user.save();
        }

        const jwtToken = jwt.sign({
            id: user._id,
            email: user.email,
            planName: user.plan,
        },
            env.JWT_SECRET,
            { expiresIn: '1h' });

        res.status(200).json({
            message: 'Authentication successful',
            token: jwtToken,
        });
    } catch (error: any) {
        if (error.isJoi) {
            // Joi validation error
            next(new ValidationError(error.details[0].message));
        } else {
            next(error);
        }
    }
}

export { verifyGoogleToken };