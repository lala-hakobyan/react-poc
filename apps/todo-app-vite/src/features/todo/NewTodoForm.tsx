import {type Dispatch, useState} from "react";
import {useDispatch} from "react-redux";
import {createTodo} from "../../store/thunks";

export default function NewTodoForm({isOnline} = {isOnline: true}) {
    const [inputText, setInputText] = useState('');
    const dispatch: Dispatch<any>  = useDispatch();

    return (
        <div>
            <form>
                <div className="todo-form-group">
                    <input
                        type="text"
                        name="AddTodo"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="button" onClick={ () => {
                        dispatch(createTodo(inputText))
                        setInputText('');
                        }
                    }>{isOnline ? 'Add Todo' : 'Reconnecting...'}</button>
                </div>
            </form>
        </div>
    )
}