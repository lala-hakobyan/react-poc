'use client';
import Modal from '@/components/Modal/Modal';
import { selectAddEditNoteSlice, useNotesStore } from '@/store/notes/notesStore';
import Button from '@/components/Button/Button';
import './../../../styles/form.scss'
import './../../../styles/imageWrapper.scss'
import { useRef } from 'react';
import Image from 'next/image';
import { Note } from '@/types/note.types';
import useNoteForm from '@/features/note/AddEditNote/useNoteForm';
import { NoteForm, NoteFormContract } from '@/types/noteForm.types';
import Loader from '@/components/Loader/Loader';
import { AddEditNoteConstants } from '@/constants/addEditNote.constants';
import { ActionStatus, AddEditNoteSlice } from '@/store/notes/notesStore.types';
import { useShallow } from 'zustand/react/shallow';
import BrowseLabel from '@/components/BrowseLabel/BrowseLabel';


export default function AddEditNote() {
  const addEditNoteState: AddEditNoteSlice = useNotesStore(useShallow(selectAddEditNoteSlice));
  const noteFormContract: NoteFormContract = useNoteForm(addEditNoteState.currentEditNote as NoteForm);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const title = addEditNoteState.currentEditNote ? `Edit Note: ${addEditNoteState.currentEditNote.title}`: 'Add New Note';
  const buttonName = addEditNoteState.currentEditNote ? `Edit Note`: 'Add Note';

  const submitForm = async () => {
    let actionStatus: ActionStatus;

    if(addEditNoteState.currentEditNote) {
      actionStatus = await addEditNoteState.editNote({ ...noteFormContract.notesFormState.form, id: addEditNoteState.currentEditNote.id } as Note);
    } else {
      actionStatus = await addEditNoteState.addNote({ ...noteFormContract.notesFormState.form, id: crypto.randomUUID() } as Note);
    }

    if(actionStatus?.success) {
      closeAddEditModal();
    }
  }

  const closeAddEditModal = () => {
    addEditNoteState.setCurrentEditNote(null, false);
    resetForm();
  }

  const closeErrorModal= () => {
    addEditNoteState.setIsNoteUpdateError(false);
    closeAddEditModal();
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

  const getImageFileName = () => {
    let fileName = '';
    const path = imageInputRef.current?.value ? imageInputRef.current.value : noteFormContract.notesFormState.form.image;

    if(path) {
      const imgPartsListArr = path.split('/');
      fileName = imgPartsListArr[imgPartsListArr.length - 1];
    }

    return fileName;
  }

  return (
    <>
      {addEditNoteState.isNoteUpdateLoading && <Loader></Loader>}

      {!addEditNoteState.isNoteUpdateError &&
      <Modal isOpen={true} title={title} onClosed={() => closeAddEditModal()} >
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
              <BrowseLabel browseLabel={{
                buttonName: 'Browse Image',
                text: getImageFileName(),
                attributeName: 'imageField'
              }} />
              <input className="formGroup__formControl visually-hidden"
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
          <Button button={{ label: buttonName, disabled: !noteFormContract.isFormValid() || addEditNoteState.isNoteUpdateLoading }} onClick={() => submitForm()} />
          <Button button={{ label: 'Reset', className: 'ml-xs' }} onClick={(ev?: MouseEvent) => resetForm(ev)} />
        </Modal.Footer>
      </Modal>
      }

      <Modal isOpen={addEditNoteState.isNoteUpdateError} title="Error happened" onClosed={() => closeErrorModal()}>
        <Modal.Body>
          {AddEditNoteConstants.ui.addEditError}
        </Modal.Body>
      </Modal>
    </>
  );
}
