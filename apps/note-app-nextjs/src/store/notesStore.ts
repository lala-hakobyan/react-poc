import { create } from 'zustand';
import { Note, FetchNotesAction } from '@/types/note.types';
import notesApiService from '@/services/notesApiService';

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
      const result = await notesApiService.fetchNotes(offset, limit);

      set((state: NotesState) => (
        { notes: [...state.notes, ...result], [isLoadingKey]: false, [isErrorKey]: false }
      ));
    } catch {
      set({ [isLoadingKey]: false, [isErrorKey]: true });
    }
  },
  addNote: async (note: Note) => {
    const insertNote = { ...note, creationDate: new Date(), lastUpdatedDate: new Date() }

    set({ isNoteUpdateLoading: true });

    try {
      const result: Note = await notesApiService.addNote(insertNote);
      set((state: NotesState) => (
        { notes: [result, ...state.notes], isNoteUpdateLoading: false }
      ));
    } catch {
      set({ isNoteUpdateLoading: false, isNoteUpdateError: true });
    }
  },
  editNote: async (note: Note) => {
    set({ isNoteUpdateLoading: true });

    try {
      const updateNote = { ...note, lastUpdatedDate: new Date() };
      const result: Note = await notesApiService.editNote(updateNote);

      set((state: NotesState) => {
        return {
          notes: state.notes.map(noteItem => noteItem.id === note.id ? { ...noteItem,...result } : noteItem),
          isNoteUpdateLoading: false,
          isNoteUpdateError: false
        };
      })
    } catch {
      set({ isNoteUpdateLoading: false, isNoteUpdateError: true });
    }
  },
  deleteNote: async (noteId: string) => {
    try {
      set({ isNoteDeleteLoading: true });

      await notesApiService.deleteNote(noteId);

      set((state: NotesState) => {
        return {
          notes: state.notes.filter((note: Note) => note.id !== noteId),
          isNoteDeleteLoading: false,
          isNoteDeleteError: false
        };
      });
    }
    catch {
      set({ isNoteDeleteLoading: false, isNoteDeleteError: true })
    }
  }
}))