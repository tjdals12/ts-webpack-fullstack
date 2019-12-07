import { Request, Response, NextFunction } from 'express';

export interface AsyncController {
    (req: Request, res: Response, next?: NextFunction): Promise<void>;
}
