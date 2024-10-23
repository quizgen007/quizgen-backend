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
 *                 message:
 *                   type: string
 *                   example: "Authentication successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 */
router.post('/verify-google-token', verifyGoogleToken);

export default router;