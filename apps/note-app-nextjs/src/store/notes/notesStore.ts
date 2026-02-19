import { create } from 'zustand';
import { NotesStore } from '@/store/notes/notesStore.types';
import { createNotesListSlice } from '@/store/notes/notesListSlice';
import { createAddEditNoteSlice } from '@/store/notes/addEditNoteSlice';
import { createDeleteNoteSlice } from '@/store/notes/deleteNoteSlice';
import { devtools } from 'zustand/middleware';

export const useNotesStore = create<NotesStore>()(
  devtools((...args) => ({
    ...createDeleteNoteSlice(...args),
    ...createAddEditNoteSlice(...args),
    ...createNotesListSlice(...args),
  }),
  {
    name: 'NotesStore',
    trace: true,
    enabled: typeof window !== 'undefined'
  })
)

export const selectAddEditNoteSlice = (state: NotesStore) => ({
  currentEditNote: state.currentEditNote,
  isNoteUpdateLoading: state.isNoteUpdateLoading,
  isNoteUpdateError: state.isNoteUpdateError,
  setIsNoteUpdateError: state.setIsNoteUpdateError,
  setCurrentEditNote: state.setCurrentEditNote,
  setIsAddEditModalOpen: state.setIsAddEditModalOpen,
  addNote: state.addNote,
  editNote: state.editNote,
});

export const selectDeleteNoteSlice = (state: NotesStore) => ({
  isDeleteModalOpen: state.isDeleteModalOpen,
  currentDeleteNote: state.currentDeleteNote,
  setCurrentDeleteNote: state.setCurrentDeleteNote,
  isNoteDeleteError: state.isNoteDeleteError,
  isNoteDeleteLoading: state.isNoteDeleteLoading,
  setIsNoteDeleteError: state.setIsNoteDeleteError,
  deleteNote: state.deleteNote,
})

export const selectNotesListSlice = (state: NotesStore) => ({
  notes: state.notes,
  isNotesLoading: state.isNotesLoading,
  isLoadMoreNotesLoading: state.isLoadMoreNotesLoading,
  isNotesError: state.isNotesError,
  isLoadMoreNotesError: state.isLoadMoreNotesError,
  resetNotes: state.resetNotes,
  fetchNotes: state.fetchNotes,
  fetchNotesOffline: state.fetchNotesOffline,
});
