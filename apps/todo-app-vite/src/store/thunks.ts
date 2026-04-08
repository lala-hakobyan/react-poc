import axios from 'axios';
import { loadingStarted, loadingCompleted, loadingFailed } from "./loadingSlice.ts";
import { todoAdded, todoCompleted, todoDeleted } from "./todosSlice.ts";
import type {AppDispatch, RootState} from "./store.ts";

const apiUrl = 'http://localhost:3040/api/todos';

export const loadTodos = () => async (dispatch: AppDispatch)=> {
    dispatch(loadingStarted());
    try {
        const response = await axios.get(apiUrl);
        const todos = response.data;
        dispatch(loadingCompleted(todos));
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        dispatch(loadingFailed(errorMessage));
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTodo = (newTodoText: string) => async (dispatch: AppDispatch, _getState: () => RootState) => {
    try {
        const response = await axios.post(apiUrl, { text: newTodoText } );
        dispatch(todoAdded(response.data));
    } catch(error) {
        console.error(error);
    }
}

export const deleteTodo = (deleteTodoId: string) => async(dispatch: AppDispatch) => {
    try {
        await axios.delete(`${apiUrl}/${deleteTodoId}`);
        dispatch(todoDeleted(deleteTodoId));
    } catch(error) {
        console.error(error);
    }
}

export const markTodoAsCompleted = (todoId: string) => async (dispatch: AppDispatch) => {
    try {
        await axios.put(`${apiUrl}/${todoId}`, {isCompleted: true});
        dispatch(todoCompleted(todoId));
    } catch(error) {
        console.error(error);
    }
}
