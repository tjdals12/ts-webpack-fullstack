import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getTodos } from '../../store/modules/todo';

export default function useTodos() {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todo.todos);
    const getTodoList = useCallback(() => dispatch(getTodos.request()), []);

    return {
        todos,
        getTodoList,
    };
}
