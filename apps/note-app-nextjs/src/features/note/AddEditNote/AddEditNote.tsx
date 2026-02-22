'use client';
import { selectAddEditNoteSlice, useNotesStore } from '@/store/notes/notesStore';
import Button from '@/components/Button/Button';
import './../../../styles/form.scss'
import './../../../styles/imageWrapper.scss'
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Note } from '@/types/note.types';
import useNoteForm from '@/features/note/AddEditNote/useNoteForm';
import { NoteForm, NoteFormContract } from '@/types/noteForm.types';
import Loader from '@/components/Loader/Loader';
import { AddEditNoteConstants } from '@/constants/addEditNote.constants';
import { ActionStatus, AddEditNoteSlice } from '@/store/notes/notesStore.types';
import { useShallow } from 'zustand/react/shallow';
import BrowseLabel from '@/components/BrowseLabel/BrowseLabel';
import { generateUuid } from '@/utils/random';
import Modal from '@/components/Modal/Modal';
import { ModalNewHandle } from '@/types/modal.types';


export default function AddEditNote() {
  const addEditNoteState: AddEditNoteSlice = useNotesStore(useShallow(selectAddEditNoteSlice));
  const noteFormContract: NoteFormContract = useNoteForm(addEditNoteState.currentEditNote as NoteForm);
  const title = addEditNoteState.currentEditNote ? `Edit Note: ${addEditNoteState.currentEditNote.title}`: 'Add New Note';
  const buttonName = addEditNoteState.currentEditNote ? `Edit Note`: 'Add Note';
  const modalRef = useRef<ModalNewHandle>(null);

  const [imageFileName, setImageFileName] = useState(extractFileName(noteFormContract.notesFormState.form.image ?? ''));

  const submitForm = async () => {
    let actionStatus: ActionStatus;

    if(addEditNoteState.currentEditNote) {
      actionStatus = await addEditNoteState.editNote(
        { ...noteFormContract.notesFormState.form,
          id: addEditNoteState.currentEditNote.id,
          lastUpdatedDate: new Date()
        } as Note
      );
    } else {
      actionStatus = await addEditNoteState.addNote({
        ...noteFormContract.notesFormState.form,
        creationDate: new Date(),
        lastUpdatedDate: new Date(),
        id: generateUuid()
      } as Note
      );
    }

    if(actionStatus?.success) {
      resetAddEditModal();
      modalRef.current?.close(); // Call modal close function
    }
  }

  const resetAddEditModal = () => {
    addEditNoteState.setCurrentEditNote(null, false);
    resetForm();
  }

  const resetErrorModal= () => {
    addEditNoteState.setIsNoteUpdateError(false);
    resetAddEditModal();
  }

  const resetForm = (ev?: MouseEvent) => {
    if(ev) {
      ev.preventDefault();
    }

    setImageFileName('');

    noteFormContract.resetForm();
  }

  const imageInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    const name = file?.name ?? '';
    setImageFileName(name);
  }

  function extractFileName(path: string) {
    let fileName = '';

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
      <Modal ref={modalRef} isOpen={true} title={title} onClosed={() => resetAddEditModal()} >
        <Modal.Header />
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
                text: imageFileName,
                attributeName: 'imageField'
              }} />
              <input className="formGroup__formControl visually-hidden"
                type="file"
                name="image"
                id="imageField"
                accept=".png, .jpg, image/gif"
                onChange={(e) => {
                  noteFormContract.handleImageChange(e);
                  imageInputChange(e);
                }} />
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
          <Button
            button={{ label: buttonName, name: 'submitButton', disabled: !noteFormContract.isFormValid() || addEditNoteState.isNoteUpdateLoading }}
            onClick={() => { submitForm(); }}
          />
          <Button button={{ label: 'Reset', name: 'resetButton', className: 'ml-xs' }} onClick={(ev?: MouseEvent) => resetForm(ev)} />
        </Modal.Footer>
      </Modal>
      }

      <Modal isOpen={addEditNoteState.isNoteUpdateError} title="Error happened" onClosed={() => resetErrorModal()}>
        <Modal.Body>
          {AddEditNoteConstants.ui.addEditError}
        </Modal.Body>
      </Modal>
    </>
  );
}
