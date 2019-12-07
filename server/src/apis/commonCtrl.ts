import { Types } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export const checkObjectId = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    logger.info(`${req.originalUrl}: check id`);

    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        res.status(400).send('Invalid id');
        logger.error(`${req.originalUrl}: Invalid id`);
    } else {
        next();
    }
};
