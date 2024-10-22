import Joi from 'joi';

export const authTokenSchema = Joi.object({
    token: Joi.string().required(),
});