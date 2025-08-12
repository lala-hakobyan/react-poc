import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import { useNotesStore } from '@/store/notesStore';
import Loader from '@/components/Loader/Loader';
import { DeleteNoteConstants } from '@/constants/deleteNote.constants';

export default function DeleteNote() {
  const {
    deleteNote,
    currentDeleteNote,
    isDeleteNoteOpen,
    setCurrentDeleteNote,
    isNoteDeleteError,
    isNoteDeleteLoading,
    setIsNoteDeleteError
  } = useNotesStore();

  const deleteAction = async() => {
    if(currentDeleteNote) {
      setCurrentDeleteNote(null, false);
      await deleteNote(currentDeleteNote.id);
    }
  }

  const closeModal = () => {
    setIsNoteDeleteError(false);
  }

  return (
    <>
      {isNoteDeleteLoading && <Loader />}
      {!isNoteDeleteError && currentDeleteNote &&
        <Modal isOpen={isDeleteNoteOpen} title={`Delete Note: ${currentDeleteNote?.title}`} onClosed={() => setCurrentDeleteNote(null, false)}>
          <Modal.Body>
            {DeleteNoteConstants.confirmDeleteMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button
              button={{ label: 'Yes' }}
              onClick={() => deleteAction()}/>
            <Button
              button={{ label: 'No', className: 'ml-xs' }}
              onClick={() => setCurrentDeleteNote(null, false)}
            />
          </Modal.Footer>
        </Modal>
      }
      {isNoteDeleteError &&
        <Modal isOpen={true} title="Error happened" onClosed={closeModal}>
          <Modal.Body>
            {DeleteNoteConstants.deleteErrorMessage}
          </Modal.Body>
        </Modal>
      }
    </>
  )
}
