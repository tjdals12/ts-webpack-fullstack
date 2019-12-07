import { Router } from 'express';
import * as commonCtrl from '../commonCtrl';
import * as todoCtrl from './todo.ctrl';
import errorHandler from '../errorHandler';

const todo = Router();

todo.get('/', errorHandler(todoCtrl.getTodos));

todo.get('/:id', commonCtrl.checkObjectId, errorHandler(todoCtrl.getTodo));

export default todo;
