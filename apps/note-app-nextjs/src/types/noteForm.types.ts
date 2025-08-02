import {ChangeEvent} from "react";

export type NoteForm = {
    title: string;
    link?: string;
    description?: string;
    image?: string;
}

export type NoteFormField = 'title' | 'link' | 'description' | 'image';

// enum NoteFormField {
//     title = 'title',
//     link = 'link',
//     'description' = 'description',
//     'file' = 'file'
// }
export type NoteFormErrors = {[name: string]: string | null};

export type NoteFormTouched = {[name: string] : boolean};

export type NoteFormState = {
    form: NoteForm;
    touched: NoteFormTouched;
    errors: NoteFormErrors;
}

export type NoteFormAction = {
    type: NoteFormActionType,
    field?: NoteFormField,
    value?: string,
}

export type NoteFormActionType = 'set_field' | 'set_touched' | 'set_errors' | 'reset';

export type NoteFormContract = {
    notesFormState: NoteFormState,
    handleFieldChange: (field: NoteFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleFieldBlur: (field: NoteFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleImageChange: (ev: ChangeEvent<HTMLInputElement>) => void,
    isFormValid: () => boolean,
    resetForm: () => void,
    isTitleError: boolean,
    isLinkError: boolean
}

