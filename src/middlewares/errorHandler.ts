import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        // Operational error: send message to client
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    } else {
        // Programming or unknown error: don't leak details
        console.error('ERROR:', err);

        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

export default errorHandler;