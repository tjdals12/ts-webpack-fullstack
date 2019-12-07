import { createReducer } from 'typesafe-actions';
import { todosStateTypes, todosActionTypes } from './types';

const initialState: todosStateTypes = {
    todos: [],
    todo: {
        _id: '',
        text: '',
        done: false,
    },
};

export default createReducer<todosStateTypes, todosActionTypes>(initialState, {
    /** GET LIST */
    'todos/GET_TODOS_SUCCESS': (state, action) => ({
        ...state,
        todos: action.payload,
    }),

    /** GET LIST */
    'todos/GET_TODO_SUCCESS': (state, action) => ({
        ...state,
        todo: action.payload,
    }),
});
