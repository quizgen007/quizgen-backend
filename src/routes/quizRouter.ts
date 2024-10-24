import { Router } from "express";
import { generateQuiz } from "../controllers/quizController";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Quiz
 *     description: Quiz generation
 */

/**
 * @openapi
 * /api/quiz:
 *   post:
 *     tags:
 *       - Quiz
 *     summary: Generate a quiz
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 paragraph:
 *                   type: string
 *                   example: India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area; the most populous country from June 2023 and from the time of its independence in 1947, the world's most populous democracy.
 *                 quizType:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: Multiple Choice
 *                 difficulty:
 *                   type: string
 *                   example: Easy
 *                 numberOfQuestions:
 *                   type: number
 *                   example: 5
 *               required:
 *                 - paragraph
 *                 - quizType
 *                 - difficulty
 *                 - numberOfQuestions
 *     responses:
 *       200:
 *         description: Quiz generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paragraph:
 *                   type: string
 *                 quizType:
 *                   type: array
 *                   items:
 *                     type: string
 *                 difficulty:
 *                   type: string
 *                 numberOfQuestions:
 *                   type: number
 *                 result:
 *                   type: string
 *               required:
 *                 - paragraph
 *                 - quizType
 *                 - difficulty
 *                 - numberOfQuestions
 *                 - result
 *       400:
 *         description: Bad request
 */
router.post('/', generateQuiz);

export default router;