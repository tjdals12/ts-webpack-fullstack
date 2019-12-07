import React, { useEffect } from 'react';
import useTodos from '../../hooks/todo/useTodos';

export default function TodoList(): React.ReactElement {
    const { todos, getTodoList } = useTodos();

    useEffect(() => {
        getTodoList();
    }, []);

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo._id}>{todo.text}</li>
            ))}
        </ul>
    );
}
