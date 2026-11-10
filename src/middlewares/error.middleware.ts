import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/not-found.exception';

export interface ErrorResponse {
    statusCode: number;
    message: string;
    error: string;
    timestamp: string;
    path?: string;
    details?: unknown;
}

export class ErrorMiddleware {
    static handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        let errorResponse: ErrorResponse;

        if (err instanceof HttpException) {
            errorResponse = {
                statusCode: err.statusCode,
                message: err.message,
                error: err.name,
                timestamp: new Date().toISOString(),
                path: req.path
            };

            if (err instanceof ValidationException) {
                errorResponse.details = err.getDetails();
            }

            res.status(err.statusCode).json(errorResponse);
            return;
        }

        if (err instanceof Error) {
            errorResponse = {
                statusCode: 500,
                message: process.env.NODE_ENV === 'production' 
                    ? 'Internal server error' 
                    : err.message,
                error: 'InternalServerError',
                timestamp: new Date().toISOString(),
                path: req.path
            };

            if (process.env.NODE_ENV !== 'production') {
                errorResponse.details = {
                    name: err.name,
                    stack: err.stack
                };
            }

            res.status(500).json(errorResponse);
            return;
        }

        errorResponse = {
            statusCode: 500,
            message: 'Unknown error occurred',
            error: 'UnknownError',
            timestamp: new Date().toISOString(),
            path: req.path
        };

        res.status(500).json(errorResponse);
    }

    static notFoundHandler(req: Request, res: Response): void {
        res.status(404).json({
            statusCode: 404,
            message: `Route ${req.method} ${req.path} not found`,
            error: 'NotFound',
            timestamp: new Date().toISOString(),
            path: req.path
        });
    }

    static asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
    }
}