import express from 'express';

export const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        ok: false,
        msg: message
    });
}