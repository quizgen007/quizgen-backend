import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: Users management
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.get('/', authMiddleware, getAllUsers);

export default router;