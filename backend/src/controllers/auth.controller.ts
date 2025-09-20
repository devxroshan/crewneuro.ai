import {Request, Response,} from 'express';

// Utils
import { asyncHandler } from '../utils/asyncHandler';
import AppError from '../utils/appError';


const signup = async (req: Request, res:Response):Promise<void> => {
    throw new AppError('This route is not yet defined!.', 500);
}

export const SignUp = asyncHandler({fn: signup});
