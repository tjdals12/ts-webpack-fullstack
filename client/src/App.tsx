import React from 'react';
import Profile from './components/Profile';

export default function App(): React.ReactElement {
    return (
        <div>
            <Profile name="Seongmin" age={26} />
        </div>
    );
}
