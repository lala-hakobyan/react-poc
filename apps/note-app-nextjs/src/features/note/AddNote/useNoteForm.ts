import {
    NoteForm,
    NoteFormAction,
    NoteFormContract,
    NoteFormErrors,
    NoteFormField,
    NoteFormState
} from "@/types/noteForm.types";
import {ChangeEvent, useReducer} from "react";

const validateField = (field: NoteFormField | null, value: string | null) => {
    const errors: NoteFormErrors = {};

    if(field === 'title' && !value) {
        errors.title = 'Title is required';
    }

    if(field === 'link' && (value && !value?.startsWith('http'))) {
        errors.link = 'Please provide a valid URL.'
    }

    return errors;
}

/**
 * Custom hook for handling form logic
 */
export default function useNoteForm(): NoteFormContract {
    const defaultFormValue: NoteForm = {
        title: '',
        description: '',
        link: '',
        image: ''
    }

    const defaultStateValue: NoteFormState = {
        form: defaultFormValue,
        errors: {},
        touched: {}
    }

    const notesFormReducer = (state: NoteFormState, action: NoteFormAction): NoteFormState => {
        const actionField = action.field as string;
        switch(action.type) {
            case 'set_field':
                return {
                    ...state,
                    form: {...state.form, [actionField]: action.value},
                    errors: {...state.errors, [actionField]: null}
                }
            case 'set_touched':
                return {
                    ...state,
                    touched: {...state.touched, [actionField]: true},
                    errors: {
                        ...state.errors,
                        ...validateField(action?.field ?? null, action?.value ?? null)
                    }
                }
            case 'reset':
                return {
                    ...state,
                    ...defaultStateValue
                };
            default:
                return state;
        }
    }

    const [notesFormState, dispatch] = useReducer(notesFormReducer, defaultStateValue);

    const isTitleError: boolean = !!(notesFormState.touched.title && notesFormState.errors.title);

    const isLinkError: boolean =  !!(notesFormState.touched.link && notesFormState.errors.link);

    const resetForm = () => {
        dispatch({type: 'reset'})
    }

    const handleFieldChange = (field: NoteFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({type: 'set_field', field, value: ev.target.value})
    }

    const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files? ev.target.files[0] : null;
        if(file) {
            const url = URL.createObjectURL(file);
            dispatch({type: 'set_field', field: 'image', value: url})
        }
    }

    const handleFieldBlur = (field: NoteFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({type: 'set_touched', field, value: ev.target.value});
    }

    const isFormValid = (): boolean => {
        const errorsKeys: string[] = Object.keys(notesFormState.errors);
        const hasError = errorsKeys.some(key => !!notesFormState.errors[key as NoteFormField])
        return errorsKeys.length !== 0 && !hasError;
    }

    return {
        notesFormState,
        handleFieldChange,
        handleFieldBlur,
        handleImageChange,
        resetForm,
        isFormValid,
        isTitleError,
        isLinkError,
    }

}