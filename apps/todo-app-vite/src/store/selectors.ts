import type {TodosStore} from "../data/data.ts";
import {createSelector} from "@reduxjs/toolkit";

export const getTodos = (state: TodosStore) => state.todos.value;
export const getTodosLoading = (state: TodosStore) => !state.loading.completed;

// export const getCompletedTodos = createSelector([getTodos, getTodosLoading], (todos, todosLoading) => todos.filter(item => item.isCompleted));
export const getCompletedTodos = createSelector([getTodos], (todos) => todos.filter(item => item.isCompleted));
export const getIncompleteTodos = createSelector([getTodos], (todos) => todos.filter(item => !item.isCompleted));