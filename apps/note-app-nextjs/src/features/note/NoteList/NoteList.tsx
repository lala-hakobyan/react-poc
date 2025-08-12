'use client';
import styles from './NoteList.module.scss';
import NoteCard from '@/components/NoteCard/NoteCard';
import { Note } from '@/types/note.types';
import Button from '@/components/Button/Button';
import { useEffect, useRef } from 'react';
import Loader from '@/components/Loader/Loader';
import { useNotesStore } from '@/store/notesStore';
import DeleteNote from '@/features/note/DeleteNote/DeleteNote';
import Alert from '@/components/Alert/Alert';
import { NoteListConstants } from '@/constants/noteList.constants';

export  default function NoteList() {
  const {
    notes,
    isNotesLoading,
    isNotesError,
    isLoadMoreNotesLoading,
    isLoadMoreNotesError,
    fetchNotes,
    setCurrentEditNote,
    setCurrentDeleteNote,
    resetNotes,
  } = useNotesStore();
  const initializedRef = useRef(false);

  const loadMoreAction = () => {
    fetchNotes(notes.length, 9, 'set_load_more');
  }

  useEffect(() => {
    if(!initializedRef.current) {
      resetNotes();
      initializedRef.current = true;
      fetchNotes();
    }

  }, [fetchNotes, resetNotes]);

  return (
    <>
      {!isNotesLoading &&
        <>
          <div className={styles.noteList}>
            {notes.map((note: Note) => (
              <div className={styles.noteList__item} key={note.id}>
                <NoteCard
                  onEdit={() => setCurrentEditNote(note, true)}
                  onDelete={() => setCurrentDeleteNote(note, true) }
                  noteCard={{ note: note, showImage: true, showActions: true }}
                />
              </div>
            ))}
          </div>
          <DeleteNote />
        </>
      }

      {isNotesLoading && <Loader />}

      {!isNotesLoading && !isNotesError &&
        <div className="text-center mt-md">
          {isLoadMoreNotesError &&
            <Alert alert={{ type: 'danger', className: 'mb-sm' }}>{NoteListConstants.loadMoreErrorMessage}</Alert>
          }
          <Button
            button={{
              label: isLoadMoreNotesLoading ? 'Loading' : 'Load More',
              type: 'button',
              icon: isLoadMoreNotesLoading ? 'icon-loading' : '',
              style: 'ghost',
              className: `${styles['noteList__button']}`,
              disabled: isLoadMoreNotesLoading
            }}
            onClick={loadMoreAction}
          />
        </div>
      }

      {isNotesError &&
        <Alert alert={{ type: 'danger' }}>{ NoteListConstants.pageTitle }</Alert>
      }
    </>
  )
}
