import { ChangeEvent } from 'react';

export type ContactForm = {
    name: string,
    email: string,
    subject?: string,
    message?: string,
}

export type ContactFormField = 'name' | 'email' | 'subject' | 'message';

export type ContactFormErrors = {
    [name: string] : string | null
}

export type ContactFormTouched = {
    [name: string]: boolean
}

export type ContactFormState = {
    form: ContactForm,
    errors: ContactFormErrors,
    touched: ContactFormTouched,
    isValid: boolean;
}

export type SetFieldAction = {
    type: 'set_field',
    field: ContactFormField,
    value: string | null,
}

export type SetTouchedAction = {
    type: 'set_touched',
    field: ContactFormField,
    value: string | null,
}

export type SetFormValueAction = {
    type: 'set_form_value',
    value: ContactForm
}

export type ContactFormAction = SetFieldAction | SetTouchedAction | SetFormValueAction;

export type ContactFormContract = {
    contactFormState: ContactFormState,
    handleFieldChange: (field: ContactFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleFieldBlur: (field: ContactFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    resetForm: () => void;
    isNameError: boolean,
    isEmailError: boolean,
    isMessageError: boolean,
}

export type ContactFormActionType = 'set_field' | 'set_touched' | 'set_form_value';

export type ContactFormResultStatus = 'isLoading' | 'errors';

export type ContactFormStatus = {
    isLoading: boolean,
    isError: boolean;
    isSuccess: boolean
}