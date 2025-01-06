import type { RequestHandler } from 'express';
import { ZodError, type ZodSchema } from 'zod';


function validateBodyMiddleware(schema: ZodSchema): RequestHandler {
    return (req, res, next) => {
        try {
            schema.parse(req.body)
            next();
        } catch (e) {
            if (e instanceof ZodError) {
                res.status(400).json({ errors: e.issues });
            } else {
                console.error(e);
                res.status(500).json({ message: 'Error!' });
            }
        }
    };
}


export default validateBodyMiddleware;
