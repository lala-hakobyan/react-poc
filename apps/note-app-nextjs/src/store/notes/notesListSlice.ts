import { StoreApi } from 'zustand/index';
import { NotesListSlice, NotesStore } from '@/store/notes/notesStore.types';
import { FetchNotesAction } from '@/types/note.types';
import notesApiService from '@/services/notesApiService';
import loggerService from '@/services/loggerService';
import notesCacheService from '@/services/notesCacheService';

export const createNotesListSlice = (set: StoreApi<NotesStore>['setState']): NotesListSlice => ({
  notes: [],
  isNotesLoading: true,
  isLoadMoreNotesLoading: false,
  isNotesError: false,
  isLoadMoreNotesError: false,

  resetNotes: () => {
    set({ notes: [] })
  },

  fetchNotes: async (offset = 0, limit = 9, context = 'myNotes', type: FetchNotesAction = 'set_init') => {
    const isLoadingKey = type === 'set_load_more' ? 'isLoadMoreNotesLoading' : 'isNotesLoading';
    const isErrorKey = type === 'set_load_more'? 'isLoadMoreNotesError' : 'isNotesError';

    set({ [isLoadingKey]: true })

    try {
      const result = await notesApiService.fetchNotes(offset, limit);
      set((state: NotesStore) => (
        { notes: [...state.notes, ...result], [isLoadingKey]: false, [isErrorKey]: false }
      ));

      if(result.length!==0) {
        notesCacheService.saveNotes(result).catch(console.error);
      }

      return { success: true };
    } catch(error: unknown) {
      set({ [isLoadingKey]: false, [isErrorKey]: true });
      loggerService.log({
        type: 'error',
        context: context,
        messageType: 'fetchNotes'
      }, null, error as Error);

      return { success: false };
    }
  },
});
