import { ActionType } from 'typesafe-actions';
import { getTodo, getTodos } from './actions';

const actions = { getTodo, getTodos };
export type todosActionTypes = ActionType<typeof actions>;

export type Todo = {
    _id: string;
    text: string;
    done: boolean;
};

export type todosStateTypes = {
    todo: Todo;
    todos: Todo[];
};
