'use client';
import styles from './NoteList.module.scss';
import { Note } from '@/types/note.types';
import Button from '@/components/Button/Button';
import { useCallback, useEffect, useRef } from 'react';
import Loader from '@/components/Loader/Loader';
import { selectNotesListSlice, useNotesStore } from '@/store/notes/notesStore';
import Alert from '@/components/Alert/Alert';
import { NoteListConstants } from '@/constants/noteList.constants';
import { useShallow } from 'zustand/react/shallow';
import { NotesStore } from '@/store/notes/notesStore.types';
import { NoteCard } from '@/components/NoteCard/NoteCard';

const isOfflineModeOn = process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE_ON_ERROR === 'true';

export  default function NoteList() {
  const notesListState = useNotesStore(useShallow(selectNotesListSlice));
  const { setCurrentEditNote, setCurrentDeleteNote } = useNotesStore(useShallow((state: NotesStore) => ({
    setCurrentEditNote: state.setCurrentEditNote,
    setCurrentDeleteNote: state.setCurrentDeleteNote
  })));

  const handleEditNote = useCallback((note: Note) => setCurrentEditNote(note, true), [setCurrentEditNote]);
  const handleDeleteNote = useCallback((note: Note) => setCurrentDeleteNote(note, true), [setCurrentDeleteNote]);
  const initializedRef = useRef(false);


  const loadMoreAction = () => {
    notesListState.fetchNotes(notesListState.notes.length, 9, 'myNotesLoadMore','set_load_more');
  }

  useEffect(() => {
    if(!initializedRef.current) {
      notesListState.resetNotes();
      initializedRef.current = true;
      notesListState.fetchNotes();
    }

  }, [notesListState, notesListState.fetchNotes, notesListState.resetNotes]);

  return (
    <>
      {notesListState.isNotesError &&
        <div className="mb-md">
          <Alert alert={{ type: 'danger' }}>
            <p dangerouslySetInnerHTML={{
              __html: isOfflineModeOn
                ? NoteListConstants.fetchErrorMessageOffline
                : NoteListConstants.fetchErrorMessage
            }} />
          </Alert>
        </div>
      }

      {!notesListState.isNotesLoading &&
        <>
          <ul className={styles.noteList}>
            {notesListState.notes.map((note: Note) => (
              <li className={styles.noteList__item} key={note.id}>
                <NoteCard
                  onEdit={() => handleEditNote(note)}
                  onDelete={() => handleDeleteNote(note)}
                  noteCard={{ note: note, showImage: true, showActions: true, dataId: note.id, isReadonly: notesListState.isNotesError }}
                />
              </li>
            ))}
          </ul>
        </>
      }

      {notesListState.isNotesLoading && <Loader />}

      {!notesListState.isNotesLoading && notesListState.notes && notesListState.notes.length!==0 &&
        <div className="text-center mt-md">
          {notesListState.isLoadMoreNotesError && !isOfflineModeOn &&
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
    </>
  )
}
