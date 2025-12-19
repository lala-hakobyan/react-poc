import { StoreApi } from 'zustand/index';
import { ActionStatus, AddEditNoteSlice, NotesStore } from '@/store/notes/notesStore.types';
import { Note } from '@/types/note.types';
import notesApiService from '@/services/notesApiService';
import loggerService from '@/services/loggerService';

export const createAddEditNoteSlice = (set: StoreApi<NotesStore>['setState']): AddEditNoteSlice => ({
  isAddEditModalOpen: false,

  currentEditNote: null,
  isNoteUpdateLoading: false,
  isNoteUpdateError: false,

  setIsNoteUpdateError: (val: boolean) => {set({ isNoteUpdateError: val })},

  setCurrentEditNote: (note: Note | null, open: boolean) => {
    set({
      currentEditNote: note,
      isAddEditModalOpen: open,
    });
  },

  setIsAddEditModalOpen: (val: boolean) => {set({ isAddEditModalOpen: val })},

  addNote: async (note: Note) => {
    set({ isNoteUpdateLoading: true });

    try {
      const result: Note = await notesApiService.addNote(note);
      set((state: NotesStore) => (
        {
          notes: [result, ...state.notes],
          isNoteUpdateLoading: false,
          isNoteUpdateError: false
        }
      ));

      return { success: true };
    } catch(error: unknown) {
      set({ isNoteUpdateLoading: false, isNoteUpdateError: true });

      loggerService.log({
        type: 'error',
        context: 'myNotes',
        messageType: 'addNote'
      }, null, error as Error);

      return { success: false };
    }
  },

  editNote: async (note: Note): Promise<ActionStatus> => {

    set({ isNoteUpdateLoading: true });

    try {
      const result: Note = await notesApiService.editNote(note);

      set((state: NotesStore) => (
        {
          notes: state.notes.map(noteItem => noteItem.id === note.id ? { ...noteItem,...result } : noteItem),
          isNoteUpdateLoading: false,
          isNoteUpdateError: false
        }
      ))

      return { success: true };
    } catch(error: unknown) {
      set({ isNoteUpdateLoading: false, isNoteUpdateError: true });

      loggerService.log({
        type: 'error',
        context: 'myNotes',
        messageType: 'editNote'
      }, null, error as Error);

      return { success: false };
    }
  },
});
