import { create } from 'zustand';
import { Note, FetchNotesAction } from '@/types/note.types';

type NotesState = {
    notes: Note[],
    currentEditNote: Note | null,
    currentDeleteNote: Note | null,
    isAddNewNoteOpen: boolean,
    isDeleteNoteOpen: boolean,
    isNotesLoading: boolean,
    isLoadMoreNotesLoading: boolean,
    isNoteUpdateLoading: boolean,
    isNoteDeleteLoading: boolean,
    isNotesError: boolean,
    isLoadMoreNotesError: boolean,
    isNoteUpdateError: boolean,
    isNoteDeleteError: boolean,
    setIsAddNewNoteOpen: (val: boolean) => void,
    setIsNoteUpdateError: (val: boolean) => void,
    setIsNoteDeleteError: (val: boolean) => void,
    setCurrentEditNote: (val: Note | null, open: boolean) => void,
    setCurrentDeleteNote: (val: Note | null, open: boolean) => void,
    resetNotes: () => void,
    fetchNotes: (offset?: number, limit?: number, type?: FetchNotesAction) => Promise<void>,
    deleteNote: (noteId: string) => Promise<void>,
    addNote: (note: Note) => Promise<void>,
    editNote: (note: Note) => Promise<void>
}
export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  currentEditNote: null,
  currentDeleteNote: null,
  isDeleteNoteOpen: false,
  isAddNewNoteOpen: false,
  isNotesLoading: true,
  isLoadMoreNotesLoading: false,
  isNoteUpdateLoading: false,
  isNoteDeleteLoading: false,
  isNoteUpdateError: false,
  isLoadMoreNotesError: false,
  isNotesError: false,
  isNoteDeleteError: false,
  setIsAddNewNoteOpen: (val: boolean) => {set({ isAddNewNoteOpen: val })},
  setIsNoteDeleteError: (val: boolean) => {set({ isNoteDeleteError: val })},
  setIsNoteUpdateError: (val: boolean) => {set({ isNoteUpdateError: val })},
  setCurrentEditNote: (note: Note | null, open: boolean) => {
    set({
      currentEditNote: note,
      isAddNewNoteOpen: open
    });
  },
  setCurrentDeleteNote: (note:  Note | null, open: boolean) => {
    set({ currentDeleteNote: note, isDeleteNoteOpen: open });
  },
  resetNotes: () => {
    set({ notes: [] })
  },
  fetchNotes: async (offset = 0, limit = 9, type: FetchNotesAction = 'set_init') => {
    const isLoadingKey = type === 'set_load_more' ? 'isLoadMoreNotesLoading' : 'isNotesLoading';
    const isErrorKey = type === 'set_load_more'? 'isLoadMoreNotesError' : 'isNotesError';

    set({ [isLoadingKey]: true })
    try {
      const response = await fetch(`api/notes?offset=${offset}&limit=${limit}`);

      if(response.ok) {
        const result = await response.json();
        set((state: NotesState) => (
          { notes: [...state.notes, ...result], [isLoadingKey]: false, [isErrorKey]: false }
        ));
      } else {
        set({ [isLoadingKey]: false, [isErrorKey]: true });
      }
    } catch {
      set({ [isLoadingKey]: false, [isErrorKey]: true });
    }
  },
  addNote: async (note: Note) => {
    const insertNote = { ...note, creationDate: new Date(), lastUpdatedDate: new Date() }
    try {
      set({ isNoteUpdateLoading: true });
      const response = await fetch('api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(insertNote)
      });

      if(response.ok) {
        const result: Note = await response.json();
        set((state: NotesState) => (
          { notes: [result, ...state.notes], isNoteUpdateLoading: false }
        ));
      } else {
        set({ isNoteUpdateLoading: false, isNoteUpdateError: true });
      }
    } catch {
      set({ isNoteUpdateLoading: false, isNoteUpdateError: true });
    }
  },
  editNote: async (note: Note) => {
    try {
      set({ isNoteUpdateLoading: true });
      const updateNote = { ...note, lastUpdatedDate: new Date() };
      const response = await fetch('api/notes/'+ note.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateNote)
      });

      if(response.ok) {
        const note: Note = await response.json();

        set((state: NotesState) => {
          return {
            notes: state.notes.map(noteItem => noteItem.id === note.id ? { ...noteItem,...note } : noteItem),
            isNoteUpdateLoading: false,
            isNoteUpdateError: false
          };
        })
      } else {
        set({ isNoteUpdateLoading: false, isNoteUpdateError: true });
      }

    } catch {
      set({ isNoteUpdateLoading: false, isNoteUpdateError: true });
    }
  },
  deleteNote: async (noteId: string) => {
    try {
      set({ isNoteDeleteLoading: true });
      const response = await fetch(`api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response.ok) {
        set((state: NotesState) => {
          return {
            notes: state.notes.filter((note: Note) => note.id!== noteId),
            isNoteDeleteLoading: false,
            isNoteDeleteError: false
          }
        })
      } else {
        set({ isNoteDeleteLoading: false, isNoteDeleteError: true })
      }
    } catch {
      set({ isNoteDeleteLoading: false, isNoteDeleteError: true })
    }
  }
}))