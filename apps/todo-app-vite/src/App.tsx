import {lazy, Suspense, useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadTodos} from "./store/thunks.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from './layout/Header.tsx';
import Footer from './layout/Footer.tsx';
import type {AppDispatch} from "./store/store.ts";

function App() {
    const dispatch: AppDispatch = useDispatch();
    const Todo = lazy(() => import('./features/todo/TodoList.tsx'));
    const Home = lazy(() => import('./features/home/About.tsx'));
    const Contact = lazy(() => import('./features/contact/Contact.tsx'));
    useEffect(() => {
        dispatch(loadTodos())
    }, [dispatch]);
    return (
        <>
            <BrowserRouter>
                <Header />
                <main>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/todo" element={<Todo />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
