import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.css'
import App from './App.tsx'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from 'react-redux';
import { todosSlice } from "./store/todosSlice.ts";
import {loadingSlice} from "./store/loadingSlice.ts";

const store = configureStore({
    reducer: {
        todos: todosSlice.reducer,
        loading: loadingSlice.reducer,
    }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)
