import { StoreApi } from 'zustand/index';
import { DeleteNoteSlice, NotesStore } from '@/store/notes/notesStore.types';
import { Note } from '@/types/note.types';
import notesApiService from '@/services/notesApiService';
import loggerService from '@/services/loggerService';

export const createDeleteNoteSlice = (set: StoreApi<NotesStore>['setState']): DeleteNoteSlice => ({
  isDeleteModalOpen: false,

  currentDeleteNote: null,
  isNoteDeleteLoading: false,
  isNoteDeleteError: false,

  setIsNoteDeleteError: (val: boolean) => {set({ isNoteDeleteError: val })},

  setCurrentDeleteNote: (note:  Note | null, open: boolean) => {
    set({ currentDeleteNote: note, isDeleteModalOpen: open });
  },

  setIsDeleteModalOpen: (val: boolean) => {set({ isDeleteModalOpen: val })},

  deleteNote: async (noteId: string) => {
    try {
      set({ isNoteDeleteLoading: true });

      await notesApiService.deleteNote(noteId);

      set((state: NotesStore) => {
        return {
          notes: state.notes.filter((note: Note) => note.id !== noteId),
          isNoteDeleteLoading: false,
          isNoteDeleteError: false
        };
      });

      return { success: true };
    }
    catch(error: unknown) {
      set({ isNoteDeleteLoading: false, isNoteDeleteError: true });
      loggerService.logMessage('deleteNote', 'error', error);

      return { success: false };
    }
  }
});
