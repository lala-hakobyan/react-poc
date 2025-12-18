import { FetchNotesAction, Note } from '@/types/note.types';
import { LogContext } from '@/types/logMessage.types';

export type ActionStatus = {
  success: boolean;
}

export type NotesListSlice = {
  notes: Note[],
  isNotesLoading: boolean,
  isLoadMoreNotesLoading: boolean,
  isNotesError: boolean,
  isLoadMoreNotesError: boolean,
  resetNotes: () => void,
  fetchNotes: (offset?: number, limit?: number, context?: LogContext, type?: FetchNotesAction) => Promise<ActionStatus>,
}

export type AddEditNoteSlice = {
  isAddEditModalOpen?: boolean,
  currentEditNote: Note | null,
  isNoteUpdateLoading: boolean,
  isNoteUpdateError: boolean,
  setIsNoteUpdateError: (val: boolean) => void,
  setCurrentEditNote: (val: Note | null, open: boolean) => void,
  setIsAddEditModalOpen: (val: boolean) => void,
  addNote: (note: Note) => Promise<ActionStatus>,
  editNote: (note: Note) => Promise<ActionStatus>
}

export type DeleteNoteSlice = {
  isDeleteModalOpen: boolean,
  currentDeleteNote: Note | null,
  isNoteDeleteLoading: boolean,
  isNoteDeleteError: boolean,
  setIsNoteDeleteError: (val: boolean) => void,
  setIsDeleteModalOpen: (val: boolean) => void,
  setCurrentDeleteNote: (val: Note | null, open: boolean) => void,
  deleteNote: (noteId: string) => Promise<ActionStatus>,
}

export type NotesStore = NotesListSlice & AddEditNoteSlice & DeleteNoteSlice;
