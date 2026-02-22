import {useState} from "react";
import {useDispatch} from "react-redux";
import {createTodo} from "../../store/thunks";
import type {AppDispatch} from "../../store/store.ts";

export default function NewTodoForm({isOnline} = {isOnline: true}) {
    const [inputText, setInputText] = useState('');
    const [error, setError] = useState(false);
    const dispatch: AppDispatch = useDispatch();


    const handleAddTodo = () => {
        if(inputText.trim() === '') {
            setError(true);
            return;
        }

        dispatch(createTodo(inputText))
        setInputText('');
        setError(false);
    }

    return (
        <div>
            <form className="todo-form">
                <p>💡 <strong>Note:</strong> You can add a <strong>!</strong> to the end of a todo to make it important.</p>

                <div className="todo-form-group">
                    <input
                        type="text"
                        name="AddTodo"
                        value={inputText}
                        className={error ? 'input-error' : ''}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="button" onClick={handleAddTodo}>{isOnline ? 'Add Todo' : 'Reconnecting...'}</button>
                </div>
                {error && <p className="error-message">Please enter a todo.</p>}
            </form>
        </div>
    )
}
