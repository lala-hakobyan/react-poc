import type {TodosStore} from "../data/data";
import {getCompletedTodos} from "./selectors";

function testSelectors() {
    const fakeStore: TodosStore = {
        todos : {
            value: [
                {
                    id: '8555520',
                    text: 'Todo1',
                    isCompleted: false
                },
                {
                    id: '8575520',
                    text: 'Todo2',
                    isCompleted: true
                }
            ]
        },
        loading: {
            completed: false,
            successful: false
        }
    }

    const result = getCompletedTodos(fakeStore);

    if(result.length === 1 && result[0].isCompleted) {
        console.log('testSelectors: Test works');
    } else {
        throw new Error('testSelectors: Test fails');
    }
}

testSelectors();