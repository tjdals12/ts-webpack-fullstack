import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reduction.scss';
import { Provider } from 'react-redux';
import App from './App';
import configure from './store';

const store = configure();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
