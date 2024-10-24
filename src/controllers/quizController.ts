import { Request, Response, NextFunction } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import env from '../config/envConfig';
import { quizSchema } from '../validators/quizValidator';
import { ValidationError } from '../errors';

const generateQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { paragraph, quizType, difficulty, numberOfQuestions }
            = await quizSchema.validateAsync(req.body);

        const apiKey = env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = "Create a quiz from the following paragraph: " + paragraph
            + "\n\n - Question type(s): " + quizType.join(", ")
            + ".\n - Difficulty level: " + difficulty
            + ".\n - Number of questions: " + numberOfQuestions
            + ".\n Language: Use the same language as in the given paragraph for both questions and answers."
            + "\n\n Ensure the questions focus on key points from the paragraph and align with the specified quiz types, difficulty level, and language.";

        const result = await model.generateContent(prompt);

        res.status(200).json({
            message: 'Quiz generated successfully!',
            quiz: {
                paragraph,
                quizType,
                difficulty,
                numberOfQuestions,
            },
            result: result.response.text(),
        });
    } catch (error: Error | any) {
        if (error.isJoi) {
            return next(new ValidationError(error.details[0].message));
        }
        next(error);
    }
};

export { generateQuiz };