'use client';
import Modal from '@/components/Modal/Modal';
import {useNotesStore} from '@/store/notesStore';
import Button from '@/components/Button/Button';
import './../../../styles/form.scss'
import './../../../styles/imageWrapper.scss'
import {useRef} from 'react';
import Image from 'next/image';
import {Note} from '@/types/note.types';
import useNoteForm from '@/features/note/AddEditNote/useNoteForm';
import {NoteForm, NoteFormContract} from '@/types/noteForm.types';
import Loader from '@/components/Loader/Loader';


export default function AddEditNote() {
  const {
    isAddNewNoteOpen,
    addNote,
    editNote,
    isNoteUpdateLoading,
    isNoteUpdateError,
    currentEditNote,
    setCurrentEditNote,
    setIsNoteUpdateError,
  } = useNotesStore();
  const noteFormContract: NoteFormContract = useNoteForm(currentEditNote as NoteForm);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const title = currentEditNote ? `Edit Note: ${currentEditNote.title}`: 'Add New Note';
  const buttonName = currentEditNote ? `Edit Note`: 'Add Note';

  const submitForm = async () => {
    if(currentEditNote) {
      await editNote(noteFormContract.notesFormState.form as Note);
    } else {
      await addNote({...noteFormContract.notesFormState.form, id: crypto.randomUUID()} as Note);
    }
    closeModal();
  }

  const closeModal = () => {
    setCurrentEditNote(null, false);
    resetForm();
  }

  const closeErrorModal= () => {
    setIsNoteUpdateError(false);
    resetForm();
  }

  const resetForm = (ev?: MouseEvent) => {
    if(ev) {
      ev.preventDefault();
    }

    if(imageInputRef.current) {
      imageInputRef.current.value = ''
    }

    noteFormContract.resetForm();
  }

  return (
    <>
      {isNoteUpdateLoading && <Loader></Loader>}
      <Modal isOpen={isAddNewNoteOpen} title={title} onClosed={() => closeModal()} >
        <Modal.Body>
          <form className="form">
            <div className="formGroup">
              <label className="formGroup__label formGroup__label--required" htmlFor="titleField">Title</label>
              <input type="text"
                className={noteFormContract.isTitleError ? 'formGroup__formControl formGroup__formControl--error' : 'formGroup__formControl'}
                id="titleField"
                value={noteFormContract.notesFormState.form.title ?? ''}
                onChange={noteFormContract.handleFieldChange('title')}
                onBlur={noteFormContract.handleFieldBlur('title')}
                name="title" />
              {noteFormContract.isTitleError &&
                                <span className="formGroup__errorMessage">{noteFormContract.notesFormState.errors.title}</span>
              }
            </div>

            <div className="formGroup">
              <label className="formGroup__label" htmlFor="linkField">Link</label>
              <input type="text"
                className={noteFormContract.isLinkError ? 'formGroup__formControl formGroup__formControl--error' : 'formGroup__formControl'}
                id="linkField"
                value={noteFormContract.notesFormState.form.link}
                onChange = {noteFormContract.handleFieldChange('link')}
                onBlur={noteFormContract.handleFieldBlur('link')}
                name="link" />
              {noteFormContract.isLinkError &&
                                <span className="formGroup__errorMessage">{noteFormContract.notesFormState.errors.link}</span>
              }
            </div>

            <div className="formGroup">
              <label className="formGroup__label" htmlFor="descriptionField">Description</label>
              <textarea className="formGroup__formControl"
                id="descriptionField"
                value={noteFormContract.notesFormState.form.description}
                onChange = {noteFormContract.handleFieldChange('description')}
                onBlur={noteFormContract.handleFieldBlur('description')}
                name="description">
              </textarea>
            </div>

            <div className="formGroup">
              <label htmlFor="imageField">Image: </label>
              <input className="formGroup__formControl"
                ref={imageInputRef}
                type="file"
                name="image"
                id="imageField"
                accept=".png, .jpg, image/gif"
                onChange={noteFormContract.handleImageChange} />
              {noteFormContract.notesFormState.form.image &&
                                <figure className="imageWrapper">
                                  <Image src={noteFormContract.notesFormState.form.image}
                                    className="imageWrapper__img"
                                    fill
                                    sizes="100vw"
                                    alt={noteFormContract.notesFormState.form.title ?? ''} />
                                </figure>
              }
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button button={{label: buttonName, disabled: !noteFormContract.isFormValid() || isNoteUpdateLoading}} onClick={() => submitForm()} />
          <Button button={{label: 'Reset', className: 'ml-xs'}} onClick={(ev?: MouseEvent) => resetForm(ev)} />
        </Modal.Footer>
      </Modal>
      {isNoteUpdateError &&
                <Modal isOpen={true} title="Error happened" onClosed={() => closeErrorModal()}>
                  <Modal.Body>
                        Sorry error happened while adding a note. Please try again later.
                  </Modal.Body>
                </Modal>
      }
    </>
  );
}