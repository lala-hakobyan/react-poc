import {configureStore} from "@reduxjs/toolkit";
import {todosSlice} from "./todosSlice.ts";
import {loadingSlice} from "./loadingSlice.ts";

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    loading: loadingSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
