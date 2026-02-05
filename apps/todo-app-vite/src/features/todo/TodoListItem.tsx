import type {TodoListItemParams} from "../../data/data.ts";
import {useDispatch} from "react-redux";
import {deleteTodo,markTodoAsCompleted} from "../../store/thunks.ts";
import type {Dispatch} from "react";
import styled from "styled-components";

interface IProps {
    $important?: boolean;
}

const showIcon = ({$important} : IProps) => {
    if($important) {
        return `
          display: inline-block;
          position: absolute;
          left: 10px;
          top: 10px;
          line-height: 15px;
        `;
    } else {
        return 'display: none; ';
    }
}

const CardContainer = styled.div<IProps>`
    ${props => props.$important && 'background-color: #FFF4E5'};
`
const ImportantIcon = styled.div<IProps>`
    ${showIcon};
`

export default function TodoListItem({todo}: TodoListItemParams) {
    const dispatch: Dispatch<any> = useDispatch();
    const isImportant = todo.text.endsWith('!');

    return (
        <CardContainer className="todo-card" $important={isImportant}>
            <ImportantIcon className="important-icon" $important={isImportant}>⚠️</ImportantIcon>
            <p><strong>{todo.text}</strong></p>
            {todo.isCompleted
                ? <button className="btn-danger" onClick={() => dispatch(deleteTodo(todo.id))}>Delete Item</button>
                : <button onClick={() => dispatch(markTodoAsCompleted(todo.id))}>Mark as Completed</button>
            }
        </CardContainer>
    )
}