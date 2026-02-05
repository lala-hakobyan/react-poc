import axios from 'axios';
import { loadingStarted, loadingCompleted, loadingFailed } from "./loadingSlice.ts";
import type {Dispatch} from "react";
import {todoAdded, todoCompleted, todoDeleted} from "./todosSlice.ts";

export const loadTodos = () => async (dispatch: Dispatch<any>)=> {
    dispatch(loadingStarted());
    try {
        const response = await axios.get('http://localhost:3040/api/todos');
        const todos = response.data;
        dispatch(loadingCompleted(todos));
        console.log('todos', todos);
    } catch (error: any) {
        dispatch(loadingFailed(error));
    }
}

export const createTodo = (newTodoText: string) => async (dispatch: Dispatch<any>, getState: any) => {
    try {
        const response = await axios.post('http://localhost:3040/api/todioos', { text: newTodoText } );
        // const updatedTodos = getState().todos.value.concat(response.data)
        dispatch(todoAdded(response.data));
    } catch(error) {
        console.log(error);
    }
}

export const deleteTodo = (deleteTodoId: string) => async(dispatch: Dispatch<any>, getState: any) => {
    try {
        // const updatedTodos = getState().todos.value.filter((item: Todo) => item.id!== deleteTodoId);
        await axios.delete(`http://localhost:3040/api/todos/${deleteTodoId}`);
        dispatch(todoDeleted(deleteTodoId));
    } catch(error) {
        console.log(error);
    }
}

export const markTodoAsCompleted = (todoId: string) => async (dispatch: Dispatch<any>, getState: any) => {
    try {
        const response =  await axios.put(`http://localhost:3040/api/todos/${todoId}`, {isCompleted: true});
        // const updatedTodos: Todo[] = getState().todos.value.map((item: Todo) => item.id === todoId ? response.data : item);
        dispatch(todoCompleted(todoId));
    } catch(error) {
        console.log(error);
    }
}
