import { Router } from 'express';
import api from './apis';

const router = Router();

router.use('/api/v1', api);

export default router;
