import type {TodoListItemParams} from "../../data/data.ts";
import {useDispatch} from "react-redux";
import {deleteTodo,markTodoAsCompleted} from "../../store/thunks.ts";
import type {Dispatch} from "react";
import styled from "styled-components";

interface IProps {
    $important?: boolean;
}

const getBackground = ({$important} : IProps) => {
    if($important) {
        return 'background-color: #FFF4E5;';
    }
}

const CardContainer = styled.div<IProps>`
    ${props => props.$important && 'background-color: #FFF4E5'};
    ${getBackground};
`

export default function TodoListItem({todo}: TodoListItemParams) {
    const dispatch: Dispatch<any> = useDispatch();

    return (
        <CardContainer className="todo-card" $important={todo.text.endsWith('!')}>
            <p><strong>{todo.text}</strong></p>
            {todo.isCompleted && <p>Complete!</p>}
            {todo.isCompleted
                ? <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete Item</button>
                : <button onClick={() => dispatch(markTodoAsCompleted(todo.id))}>Mark as Completed</button>
            }
        </CardContainer>
    )
}