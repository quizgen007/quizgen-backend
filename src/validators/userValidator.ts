import Joi from 'joi';

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    googleId: Joi.string(),
    plan: Joi.string().default('free'),
});