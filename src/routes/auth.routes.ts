import { Router } from "express";
import { verifyGoogleToken } from "../controllers/authController";

const router = Router();

router.post('/verify-google-token', verifyGoogleToken);

export default router;