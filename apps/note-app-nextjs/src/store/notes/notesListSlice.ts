import { StoreApi } from 'zustand/index';
import { NotesListSlice, NotesStore } from '@/store/notes/notesStore.types';
import { FetchNotesAction } from '@/types/note.types';
import notesApiService from '@/services/notesApiService';
import loggerService from '@/services/loggerService';

export const createNotesListSlice = (set: StoreApi<NotesStore>['setState']): NotesListSlice => ({
  notes: [],
  isNotesLoading: true,
  isLoadMoreNotesLoading: false,
  isNotesError: false,
  isLoadMoreNotesError: false,

  resetNotes: () => {
    set({ notes: [] })
  },

  fetchNotes: async (offset = 0, limit = 9, type: FetchNotesAction = 'set_init') => {
    const isLoadingKey = type === 'set_load_more' ? 'isLoadMoreNotesLoading' : 'isNotesLoading';
    const isErrorKey = type === 'set_load_more'? 'isLoadMoreNotesError' : 'isNotesError';

    set({ [isLoadingKey]: true })

    try {
      const result = await notesApiService.fetchNotes(offset, limit);
      set((state: NotesStore) => (
        { notes: [...state.notes, ...result], [isLoadingKey]: false, [isErrorKey]: false }
      ));

      return { success: true };
    } catch(error: unknown) {
      set({ [isLoadingKey]: false, [isErrorKey]: true });
      loggerService.logMessage('fetchNotes','error', error);
      return { success: false };
    }
  },
});
