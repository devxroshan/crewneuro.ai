import express, { NextFunction } from "express";


interface IAsyncHandler {
    fn: (req: express.Request, res: express.Response, next: NextFunction) => Promise<void>;
}

export const asyncHandler = ({fn}:IAsyncHandler) => {
    return (req: express.Request, res: express.Response, next: NextFunction) => {
        fn(req, res, next).catch(err => {
            next(err);
        });
    }
}
