import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import { selectDeleteNoteSlice, useNotesStore } from '@/store/notes/notesStore';
import Loader from '@/components/Loader/Loader';
import { DeleteNoteConstants } from '@/constants/deleteNote.constants';
import { useShallow } from 'zustand/react/shallow';
import { ActionStatus } from '@/store/notes/notesStore.types';

export default function DeleteNote() {
  const deleteNoteState = useNotesStore(useShallow(selectDeleteNoteSlice));

  const deleteAction = async() => {
    let actionStatus: ActionStatus | null = null;

    if(deleteNoteState.currentDeleteNote) {
      actionStatus = await deleteNoteState.deleteNote(deleteNoteState.currentDeleteNote.id);
    }

    if(actionStatus?.success) {
      closeDeleteModal();
    }
  }

  const closeDeleteModal = () => {
    deleteNoteState.setCurrentDeleteNote(null, false);
  }

  const closeErrorModal = () => {
    deleteNoteState.setIsNoteDeleteError(false);
    closeDeleteModal();
  }

  return (
    <>
      {deleteNoteState.isNoteDeleteLoading && <Loader />}

      {!deleteNoteState.isNoteDeleteError && deleteNoteState.currentDeleteNote &&
        <Modal
          isOpen={true}
          title={`Delete Note: ${deleteNoteState.currentDeleteNote?.title}`}
          onClosed={() => deleteNoteState.setCurrentDeleteNote(null, false)}
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
              onClick={() => deleteNoteState.setCurrentDeleteNote(null, false)}
            />
          </Modal.Footer>
        </Modal>
      }

      {deleteNoteState.isNoteDeleteError &&
        <Modal isOpen={true} title="Error happened" onClosed={closeErrorModal}>
          <Modal.Body>
            {DeleteNoteConstants.deleteErrorMessage}
          </Modal.Body>
        </Modal>
      }
    </>
  )
}
