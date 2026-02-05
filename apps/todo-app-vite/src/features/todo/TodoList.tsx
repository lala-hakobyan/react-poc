import type {Todo} from "../../data/data.ts";
import TodoListItem from "../todo/TodoListItem.tsx";
import NewTodoForm from "../todo/NewTodoForm.tsx";
import {useSelector} from "react-redux";
import {getCompletedTodos, getIncompleteTodos, getTodosLoading} from "../../store/selectors.ts";
import useOnlineStatus from "../../hooks/useOnlineStatus.tsx";

export default function TodoList() {
    const todosAreLoading = useSelector(getTodosLoading);
    const completedTodos:Todo[] = useSelector(getCompletedTodos);
    const incompleteTodos:Todo[] = useSelector(getIncompleteTodos);
    const isOnline = useOnlineStatus();

    return (
        <section>
            <h2>My Todos</h2>
     
            <NewTodoForm isOnline={isOnline} />
            {todosAreLoading
                ? <span className="loading-text">Loading...</span>
                : (<>
                    <div>
                        <h3 className="todo-list-subtitle">Incomplete Todos</h3>
                        {incompleteTodos.map((item: Todo) => (
                            <TodoListItem todo={item} key={item.id} />
                        ))}
                    </div>
                    <div>
                        <h3 className="todo-list-subtitle">Completed Todos</h3>
                        {completedTodos.map((item: Todo) => (
                            <TodoListItem todo={item} key={item.id} />
                        ))}
                    </div>
                   </>)
            }
        </section>
    );
}