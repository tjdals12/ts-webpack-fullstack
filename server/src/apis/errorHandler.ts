import { Request, Response } from 'express';
import logger from '../logger';
import { AsyncController } from './types';

const errorHandler: (fn: AsyncController) => AsyncController = fn => async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        logger.info(`${req.originalUrl}: request`);
        await fn(req, res);
        logger.info(`${req.originalUrl}: success`);
    } catch (e) {
        logger.error(`${req.originalUrl}: ${e.message}`);
        res.status(500).send(e.message);
    }
};

export default errorHandler;
