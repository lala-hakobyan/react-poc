import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {LoadingState, Todo} from "../data/data.ts";

export const loadingSliceDef = {
    name: 'loading',
    initialState: {
        completed: true,
        successful: true
    },
    reducers: {
        loadingStarted: (state: LoadingState, action: PayloadAction) => {
            state.completed = false;
            console.log('loadingCompleted', action);
        },
        loadingCompleted: (state: LoadingState, action: {payload: Todo[]}) => {
            state.completed = true;
            state.successful = true;
            console.log('loadingCompleted', action);
        },
        loadingFailed: (state: LoadingState, action: {payload: Error}) => {
            state.completed = true;
            state.successful = false;
            console.log('loadingFailed', action);
            console.log('action: payload', action.payload)
        }
    }
}

export const loadingSlice = createSlice(loadingSliceDef);

export const {loadingStarted, loadingCompleted, loadingFailed}  = loadingSlice.actions;
