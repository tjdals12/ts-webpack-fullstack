import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios';
import { Todo } from '../store/modules/todo/types';

const api: AxiosInstance = axios.create({
    baseURL: '/api/v1',
    timeout: 5000,
});

export const getTodos = (): AxiosPromise<AxiosResponse<Todo[]>> =>
    api.get('/todos');

export const getTodo = (id: string): AxiosPromise<AxiosResponse<Todo>> =>
    api.get(`/todos/${id}`);
