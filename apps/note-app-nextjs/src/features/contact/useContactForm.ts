import {
  ContactForm,
  ContactFormAction, ContactFormContract,
  ContactFormErrors,
  ContactFormField,
  ContactFormState
} from '@/types/contactForm.types';
import {ChangeEvent, useReducer} from 'react';

const defaultContactForm: ContactForm = {
  name: '',
  subject: '',
  email: '',
  message: '',
}

const defaultContactFormState: ContactFormState = {
  form: defaultContactForm,
  errors: {},
  touched: {},
  isValid: false
}

const isFormValid = (form: ContactForm) => {
  // This helper function checks all required fields
  const requiredFields: ContactFormField[] = ['name', 'email', 'message'];
  return requiredFields.every(field => {
    const value = form[field];
    const errors = validateField(field, value ?? null);
    return Object.keys(errors).length === 0;
  });
}

const validateField = (field: ContactFormField, value: string | null) => {
  const errors: ContactFormErrors = {};

  if((field === 'name' ||  field === 'email' || field === 'message') && !value) {
    errors[field] = field.charAt(0).toUpperCase() + field.slice(1) + ' is required.'
  }

  if(field === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(value)) {
      errors[field] = 'Please provide a correct email format.'
    }
  }

  return errors;
}

const contactFormReducer = (state: ContactFormState, action: ContactFormAction): ContactFormState => {
  let newState: ContactFormState;
  switch (action.type) {
    case 'set_field':
      const newErrors = validateField(action.field, action.value);
      newState = {
        ...state,
        form: {...state.form, [action.field]: action.value},
        errors: {...state.errors, [action.field]: Object.keys(newErrors).length > 0 ? newErrors[action.field] : null}
      }
      break;
    case 'set_touched':
      newState = {
        ...state,
        touched: {...state.touched, [action.field]: true},
        errors: {...state.errors, ...validateField(action.field, action.value)}
      }
      break;
    case 'set_form_value':
      newState = {
        ...state,
        form: {...state.form, ...action.value},
        errors: {},
        touched: {}
      }
      break;
    default: return state;
  }

  return {
    ...newState,
    isValid: isFormValid(newState.form)
  }
}

export default function useContractForm(): ContactFormContract {
  const [contactFormState, dispatch] = useReducer(contactFormReducer, defaultContactFormState);

  const isNameError = !!(contactFormState.touched.name && contactFormState.errors.name);

  const isEmailError = !!(contactFormState.touched.email && contactFormState.errors.email);

  const isMessageError = !!(contactFormState.touched.message && contactFormState.errors.message);

  const resetForm = () => {
    dispatch({type: 'set_form_value', value: defaultContactForm});
  }

  const handleFieldChange = (field: ContactFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({type: 'set_field', field, value: ev.target.value})
  }

  const handleFieldBlur = (field: ContactFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({type: 'set_touched', field, value: ev.target.value});
  }

  return {
    contactFormState,
    handleFieldChange,
    handleFieldBlur,
    resetForm,
    isNameError,
    isEmailError,
    isMessageError,
  }

}