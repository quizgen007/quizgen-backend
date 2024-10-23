import { Router } from "express";
import { verifyGoogleToken } from "../controllers/authController";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Auth management
 */

/**
 * @openapi
 * /api/auth/verify-google-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify Google token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *               required:
 *                 - token
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *               required:
 *                 - token
 */
router.post('/verify-google-token', verifyGoogleToken);

export default router;