import {ChangeEvent} from 'react';
import {Note} from '@/types/note.types';

export type NoteForm = {
    title: string;
    link?: string;
    description?: string;
    image?: string;
}

export type NoteFormField = 'title' | 'link' | 'description' | 'image';

export type NoteFormErrors = {[name: string]: string | null};

export type NoteFormTouched = {[name: string] : boolean};

export type NoteFormState = {
    form: NoteForm;
    touched: NoteFormTouched;
    errors: NoteFormErrors;
}

// Instead of having one combined interface like this, we use three different interfaces
// This allows better isolation, leads to long time maintainability and follows Interface Segregation Principle (ISP) from SOLID principles
// export type NoteFormAction = {
//     type: NoteFormActionType,
//     field?: NoteFormField,
//     value?: string | Note,
// }
export type NoteFormAction = SetFieldAction | SetFormValueAction | SetTouchedAction;

export type SetFieldAction = {
    type: 'set_field',
    field: NoteFormField,
    value: string | null
}

export type SetFormValueAction = {
    type: 'set_form_value',
    value: NoteForm
}

export type SetTouchedAction = {
    type: 'set_touched',
    field: NoteFormField,
    value: string | null
}

export type NoteFormActionType = 'set_field' | 'set_touched' | 'set_form_value';

export type NoteFormContract = {
    notesFormState: NoteFormState,
    handleFieldChange: (field: NoteFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleFieldBlur: (field: NoteFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    handleImageChange: (ev: ChangeEvent<HTMLInputElement>) => void,
    isFormValid: () => boolean,
    resetForm: (note?: Note) => void,
    isTitleError: boolean,
    isLinkError: boolean
}

