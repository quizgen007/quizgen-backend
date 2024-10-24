import Joi from 'joi';

// Define allowed enums for quiz types and difficulty levels
const quizTypes = [
    'Multiple Choice',
    'True or False',
    'Fill in the blanks',
    'Short Answer',
    'Matching the Pair',
] as const;
const difficultyLevels = ['Easy', 'Moderate', 'Hard'] as const;

export const quizSchema = Joi.object({
    paragraph: Joi.string().max(1000).required().messages({
        'string.base': 'Paragraph must be a string.',
        'string.max': 'Paragraph can have a maximum of 1000 characters.',
        'any.required': 'Paragraph is required.',
    }),
    quizType: Joi.array()
        .items(Joi.string().valid(...quizTypes))
        .min(1)
        .required()
        .messages({
            'array.base': 'Quiz Type must be an array of valid quiz types.',
            'any.only': `Quiz Type must contain valid quiz types: ${quizTypes.join(', ')}.`,
            'array.min': 'At least one quiz type is required.',
            'any.required': 'Quiz Type is required.',
        }),
    difficulty: Joi.string().valid(...difficultyLevels).required().messages({
        'any.only': `Difficulty Type must be one of ${difficultyLevels.join(', ')}.`,
        'any.required': 'Difficulty Type is required.',
    }),
    numberOfQuestions: Joi.number().integer().min(1).max(10).required().messages({
        'number.base': 'Number of Questions must be a number.',
        'number.min': 'Number of Questions must be at least 1.',
        'number.max': 'Number of Questions can be a maximum of 10.',
        'any.required': 'Number of Questions is required.',
    }),
});