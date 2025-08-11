import Modal from '@/components/Modal/Modal';
import Button from '@/components/Button/Button';
import { useNotesStore } from '@/store/notesStore';
import Loader from '@/components/Loader/Loader';

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
                        Are you sure you want to delete this note?
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
                        Sorry error happened while deleting a note. Please try again later.
                  </Modal.Body>
                </Modal>
      }
    </>
  )
}