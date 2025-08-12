import {
  NoteForm,
  NoteFormAction,
  NoteFormContract,
  NoteFormErrors,
  NoteFormField,
  NoteFormState
} from '@/types/noteForm.types';
import { ChangeEvent, useEffect, useMemo, useReducer } from 'react';
import { Note } from '@/types/note.types';
import { AddEditNoteConstants } from '@/constants/addEditNote.constants';

const emptyFormValue: NoteForm = {
  title: '',
  description: '',
  link: '',
  image: ''
}

const getDefaultStateValue = (defaultNoteForm: NoteForm | null): NoteFormState =>  {
  return {
    form: defaultNoteForm ? { ...emptyFormValue,...defaultNoteForm } : emptyFormValue,
    errors: {},
    touched: {}
  }
}

const validateField = (field: NoteFormField | null, value: string | null) => {
  const errors: NoteFormErrors = {};

  if(field === 'title' && !value) {
    errors.title = AddEditNoteConstants.form.titleRequiredError;
  }

  if(field === 'link' && (value && !value?.startsWith('http'))) {
    errors.link = AddEditNoteConstants.form.emailInvalidError;
  }

  return errors;
}

const notesFormReducer = (state: NoteFormState, action: NoteFormAction): NoteFormState => {
  switch(action.type) {
    case 'set_field':
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: null }
      }
    case 'set_touched':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
        errors: {
          ...state.errors,
          ...validateField(action?.field, action?.value)
        }
      }
    case 'set_form_value':
      return {
        ...state,
        form: action.value as NoteForm,
        errors: {},
        touched: {}
      };
    default:
      return state;
  }
}

/**
 * Custom hook for handling form logic
 */
export default function useNoteForm(defaultNoteForm?: NoteForm): NoteFormContract {
  const defaultStateValue = useMemo(() => getDefaultStateValue(defaultNoteForm ?? null), [defaultNoteForm]);

  const [notesFormState, dispatch] = useReducer(notesFormReducer, defaultStateValue);

  const isTitleError: boolean = !!(notesFormState.touched.title && notesFormState.errors.title);

  const isLinkError: boolean =  !!(notesFormState.touched.link && notesFormState.errors.link);

  // Use useEffect to update form state when defaultNoteForm changes
  // Without this the value of the defaultNoteForm will not be applied correctly when prop is changed
  useEffect(() => {
    const initialValue: NoteForm = defaultNoteForm ? { ...emptyFormValue, ...defaultNoteForm } : emptyFormValue;

    dispatch({ type: 'set_form_value', value: initialValue });
  }, [defaultNoteForm]); // Dependency array: run this effect whenever defaultNoteForm changes

  const resetForm = () => {
    dispatch({ type: 'set_form_value', value: emptyFormValue as Note })
  }

  const handleFieldChange = (field: NoteFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: 'set_field', field, value: ev.target.value })
  }

  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files? ev.target.files[0] : null;
    if(file) {
      const url = URL.createObjectURL(file);
      dispatch({ type: 'set_field', field: 'image', value: url })
    }
  }

  const handleFieldBlur = (field: NoteFormField) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: 'set_touched', field, value: ev.target.value });
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
