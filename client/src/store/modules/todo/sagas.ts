import { fork, take, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { getTodos, getTodo } from './actions';
import { Todo } from './types';
import * as api from '../../../lib/api';

function* runGetTodos() {
    const { data }: AxiosResponse<Todo[]> = yield call(api.getTodos);

    if (data) {
        yield put(getTodos.success(data));
    } else {
        yield put(getTodos.failure());
    }
}

function* handleGetTodos() {
    while (true) {
        yield take(getTodos.request);
        yield fork(runGetTodos);
    }
}

function* runGetTodo(id: string) {
    const { data }: AxiosResponse<Todo> = yield call(api.getTodo, id);

    if (data) {
        yield put(getTodo.success(data));
    } else {
        yield put(getTodo.failure());
    }
}

function* handleGetTodo() {
    while (true) {
        const action: ReturnType<typeof getTodo.request> = yield take(
            getTodo.request,
        );

        yield fork(runGetTodo, action.payload);
    }
}

export default function* todoSagas() {
    yield fork(handleGetTodos);
    yield fork(handleGetTodo);
}
