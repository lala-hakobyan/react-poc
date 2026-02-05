import {createSlice} from "@reduxjs/toolkit";
import {loadingCompleted} from "./loadingSlice.ts";
import type {Todo, TodosState} from "../data/data.ts";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        value: []
    },
    reducers: {
        todosUpdated: (state: TodosState, action) => {
            state.value = action.payload;
        },
        todoAdded: (state: TodosState, action) => {
            state.value = [...state.value, action.payload];
        },
        todoDeleted: (state: TodosState, action: {payload: string}) => {
          state.value = state.value.filter(todo => todo.id!== action.payload);
        },
        todoCompleted: (state: TodosState, action: {payload: string}) => {
          state.value = state.value.map(todo => todo.id === action.payload ? {...todo, isCompleted: true} : todo );
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadingCompleted, (state, action: {payload: any, type: any}) => {
            state.value = action.payload;
        })
    }
})

export const {todosUpdated, todoAdded, todoDeleted, todoCompleted} = todosSlice.actions;
