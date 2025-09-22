import express from 'express';
import { ZodObject } from 'zod';

export const schemaValidator = (schema: ZodObject<any>) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            // Map over all issues to create a more detailed error list
            const errors = result.error.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message,
            }));

            return res.status(400).json({
                message: "Invalid request body",
                errors: errors,
            });
        }
        
        // Add the parsed (and potentially transformed) data to the request object
        req.body = result.data; 
        next();
    }
}