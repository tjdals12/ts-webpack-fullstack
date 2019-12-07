import Todo from '../../model/todo';
import { AsyncController } from '../types';

export const getTodos: AsyncController = async (req, res) => {
    const todos = await Todo.find();

    res.status(200).send(todos);
};

export const getTodo: AsyncController = async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id });

    res.status(200).send(todo);
};
