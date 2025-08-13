'use client';
import styles from './NoteList.module.scss';
import { Note } from '@/types/note.types';
import Button from '@/components/Button/Button';
import { useEffect, useRef } from 'react';
import Loader from '@/components/Loader/Loader';
import { selectNotesListSlice, useNotesStore } from '@/store/notes/notesStore';
import DeleteNote from '@/features/note/DeleteNote/DeleteNote';
import Alert from '@/components/Alert/Alert';
import { NoteListConstants } from '@/constants/noteList.constants';
import { useShallow } from 'zustand/react/shallow';
import { NotesStore } from '@/store/notes/notesStore.types';
import { NoteCard } from '@/components/NoteCard/NoteCard';

export  default function NoteList() {
  const notesListState = useNotesStore(useShallow(selectNotesListSlice));
  const { setCurrentEditNote, setCurrentDeleteNote, isDeleteModalOpen } = useNotesStore(useShallow((state: NotesStore) => ({
    setCurrentEditNote: state.setCurrentEditNote,
    setCurrentDeleteNote: state.setCurrentDeleteNote,
    isDeleteModalOpen: state.isDeleteModalOpen,
  })));
  const initializedRef = useRef(false);

  const loadMoreAction = () => {
    notesListState.fetchNotes(notesListState.notes.length, 9, 'set_load_more');
  }

  useEffect(() => {
    if(!initializedRef.current) {
      notesListState.resetNotes();
      initializedRef.current = true;
      notesListState.fetchNotes();
    }

  }, [notesListState.fetchNotes, notesListState.resetNotes]);

  return (
    <>
      {!notesListState.isNotesLoading &&
        <>
          <div className={styles.noteList}>
            {notesListState.notes.map((note: Note) => (
              <div className={styles.noteList__item} key={note.id}>
                <NoteCard
                  onEdit={() => setCurrentEditNote(note, true)}
                  onDelete={() => setCurrentDeleteNote(note, true) }
                  noteCard={{ note: note, showImage: true, showActions: true }}
                />
              </div>
            ))}
          </div>
          {isDeleteModalOpen && <DeleteNote />}
        </>
      }

      {notesListState.isNotesLoading && <Loader />}

      {!notesListState.isNotesLoading && !notesListState.isNotesError &&
        <div className="text-center mt-md">
          {notesListState.isLoadMoreNotesError &&
            <Alert alert={{ type: 'danger', className: 'mb-sm' }}>{NoteListConstants.loadMoreErrorMessage}</Alert>
          }
          <Button
            button={{
              label: notesListState.isLoadMoreNotesLoading ? 'Loading' : 'Load More',
              type: 'button',
              icon: notesListState.isLoadMoreNotesLoading ? 'icon-loading' : '',
              style: 'ghost',
              className: `${styles['noteList__button']}`,
              disabled: notesListState.isLoadMoreNotesLoading
            }}
            onClick={loadMoreAction}
          />
        </div>
      }

      {notesListState.isNotesError &&
        <Alert alert={{ type: 'danger' }}>{ NoteListConstants.fetchErrorMessage }</Alert>
      }
    </>
  )
}
