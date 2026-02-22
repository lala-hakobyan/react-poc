import { StoreApi } from 'zustand/index';
import { NotesListSlice, NotesSlice, NotesStore } from '@/store/notes/notesStore.types';
import { FetchNotesAction, Note } from '@/types/note.types';
import notesApiService from '@/services/notesApiService';
import loggerService from '@/services/loggerService';
import notesCacheService from '@/services/notesCacheService';

const isOfflineMode = process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE_ON_ERROR === 'true';

export const createNotesListSlice: NotesSlice<NotesListSlice> = (set: StoreApi<NotesStore>['setState'], get: StoreApi<NotesStore>['getState']): NotesListSlice => ({
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
      loggerService.log({
        type: 'error',
        context: context,
        messageType: 'fetchNotes'
      }, null, error as Error);

      if(isOfflineMode) {
        get().fetchNotesOffline(
          offset,
          limit,
          (res: Note[]) => set((state: NotesStore) => (
            { notes: [...state.notes, ...res], [isLoadingKey]: false, [isErrorKey]: true }
          ))
        );
      } else {
        set({ [isLoadingKey]: false, [isErrorKey]: true });
      }

      return { success: false };
    }
  },

  fetchNotesOffline: async (offset = 0, limit = 9, callback = () => {}) => {
    notesCacheService.loadNotes(offset, limit)
      .then((result: Note[]) => {
        callback(result);
      })
      .catch((error) => {
        console.error(error);
      })
  }
});
