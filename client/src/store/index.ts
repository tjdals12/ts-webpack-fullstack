import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import * as reducers from './modules';
import rootSaga from './sagas';

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;

const configureStore = (
    preloadState?: Record<string, object | string | number>,
): Store => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        preloadState,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;
