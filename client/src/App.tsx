import React from 'react';
import Profile from './components/Profile';
import TodoList from './components/TodoList';

export default function App(): React.ReactElement {
    return (
        <div>
            <Profile name="Seongmin" age={26} />
            <TodoList />
        </div>
    );
}
