export interface Todo {
    id: string;
    text: string;
    isCompleted: boolean;
}

export enum Status {
    Completed  = 'completed',
    InProgress = 'inProgress'
}

export interface TodoListParams {
    onCreateClicked?: Function | undefined,
}

export interface TodoListItemParams {
    todo: Todo,
}

export interface TodosState {
    value: Todo[]
}

export interface LoadingState {
    completed: boolean,
    successful: boolean
}

export interface TodosStore {
    todos: TodosState,
    loading: LoadingState
}