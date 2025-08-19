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
    notesListState.fetchNotes(notesListState.notes.length, 9, 'set_load_more');
  }

  const getNoteById = async (noteId: string) => {
    const start = performance.now();
    try {
      const response: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN}`,
        }
      });

      if (!response.ok) {
        throw new Error('Could not find note.');
      }

      const result = await response.json();

      setCurrentEditNote(result, true);
    } catch(error) {
      console.error(error);
      throw error; // rethrow so caller can handle it
    }

    const end = performance.now();
    console.info('Total Time in ms', Math.ceil((end - start) * 1000) / 1000);
  }

  // A small function to burn CPU cycles for a few milliseconds
  const miniBlock = (duration: number) => {
    const start = performance.now();
    while (performance.now() - start < duration) {
      // This is a synchronous, blocking loop
    }
  };

  /**
   * Highlight all notes besides the clicked one with different color
   * @param currentNoteId of the clicked note
   */
  const highlightOtherNotes = (currentNoteId: string): void => {
    // Query for all note elements and type them as HTMLElements
    const allNoteElements = document.querySelectorAll<HTMLElement>('[data-note-id]');

    allNoteElements.forEach((element: HTMLElement) => {
      // Perform a "useless" heavy calculation to simulate complex logic
      // This mini-block adds just 50ms per item, but it adds up quickly!
      miniBlock(50);

      // Add style to all elements different from selected one
      if (element.dataset.noteId !== String(currentNoteId)) {
        const elementArticle = element.querySelector('article');
        if(elementArticle) {
          elementArticle.style.backgroundColor = '#E5E7EB'; // Highlight other notes
        }
      }
    });
  };

  const setEditNote = (id: string) => {
    highlightOtherNotes(id);
    getNoteById(id);
  }

  const addAppTestData = () => {
    document.cookie = 'username=Lala; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/';

    const bigData = Array(100000).fill('This is a test string to fill storage');

    localStorage.setItem('bigTestLocal', JSON.stringify(bigData));

    localStorage.setItem('preferences', JSON.stringify({ isDarkTheme: true, isTwoPhaseAuth: false }));
    sessionStorage.setItem('editModalUnsavedData', JSON.stringify({ id: 54, title: 'Tomorrow Todo List', description: 'Complete Front-end debugging knowledge' }));
  }

  useEffect(() => {
    if(!initializedRef.current) {
      notesListState.resetNotes();
      initializedRef.current = true;
      notesListState.fetchNotes();
    }

    addAppTestData();

  }, [notesListState.fetchNotes, notesListState.resetNotes]);

  return (
    <>
      {!notesListState.isNotesLoading &&
        <>
          <ul className={styles.noteList}>
            {notesListState.notes.map((note: Note) => (
              <li className={styles.noteList__item} key={note.id} data-note-id={note.id}>
                <NoteCard
                  onEdit={() => setEditNote(note.id)}
                  onDelete={() => handleDeleteNote(note)}
                  noteCard={{ note: note, showImage: true, showActions: true }}
                />
              </li>
            ))}
          </ul>

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
