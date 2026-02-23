import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import { selectDeleteNoteSlice, selectNotesListSlice, useNotesStore } from '@/store/notes/notesStore';
import Loader from '@/components/Loader/Loader';
import { DeleteNoteConstants } from '@/constants/deleteNote.constants';
import { useShallow } from 'zustand/react/shallow';
import { ActionStatus } from '@/store/notes/notesStore.types';
import { useRef } from 'react';
import { ModalNewHandle } from '@/types/modal.types';
import { debugFlags } from '@/debug-experiments/debugFlags';

export default function DeleteNote() {
  const modalRef = useRef<ModalNewHandle>(null);
  const deleteNoteState = useNotesStore(useShallow(selectDeleteNoteSlice));
  if(debugFlags.enableReactUnnecessaryRerender) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const noteListState = useNotesStore(useShallow(selectNotesListSlice));
  }

  const deleteAction = async() => {
    let actionStatus: ActionStatus | null = null;

    if(deleteNoteState.currentDeleteNote) {
      actionStatus = await deleteNoteState.deleteNote(deleteNoteState.currentDeleteNote.id);
    }

    if(actionStatus?.success) {
      modalRef.current?.close();
      resetDeleteModal();
    }
  }

  const resetDeleteModal = () => {
    deleteNoteState.setCurrentDeleteNote(null, false);
  }

  const resetErrorModal = () => {
    deleteNoteState.setIsNoteDeleteError(false);
    resetDeleteModal();
  }

  const closeDeleteModal = () => {
    resetDeleteModal();
    modalRef.current?.close();
  }

  return (
    <>
      {deleteNoteState.isNoteDeleteLoading && <Loader />}

      {!deleteNoteState.isNoteDeleteError && deleteNoteState.currentDeleteNote &&
        <Modal
          ref={modalRef}
          isOpen={true}
          title={`Delete Note: ${deleteNoteState.currentDeleteNote?.title}`}
          onClosed={() => resetDeleteModal()}
        >
          <Modal.Body>
            {DeleteNoteConstants.confirmDeleteMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button
              button={{ label: 'Yes' }}
              onClick={() => deleteAction()}/>
            <Button
              button={{ label: 'No', className: 'ml-xs' }}
              onClick={() => closeDeleteModal()}
            />
          </Modal.Footer>
        </Modal>
      }

      {deleteNoteState.isNoteDeleteError &&
        <Modal isOpen={true} title="Error happened" onClosed={() => resetErrorModal()}>
          <Modal.Body>
            {DeleteNoteConstants.deleteErrorMessage}
          </Modal.Body>
        </Modal>
      }
    </>
  )
}
