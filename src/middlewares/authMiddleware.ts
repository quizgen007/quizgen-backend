import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { UnauthorizedError, ValidationError } from "../errors";
import env from "../config/envConfig";

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return next(new UnauthorizedError("Access Denied. No token provided"));
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET as string);

        req.user = decoded;

        next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return next(new UnauthorizedError("Token has expired"));
        } else if (err instanceof JsonWebTokenError) {
            return next(new ValidationError("Invalid token"));
        } else if (err instanceof NotBeforeError) {
            return next(new ValidationError("Token is not yet valid"));
        }

        return next(err);
    }
};

export default authMiddleware;