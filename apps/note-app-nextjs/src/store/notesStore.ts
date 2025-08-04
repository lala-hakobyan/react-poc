import { create } from "zustand";
import {Note} from "@/types/note.types";

type NotesState = {
    notes: Note[],
    currentEditNote: Note | null,
    currentDeleteNote: Note | null,
    isAddNewNoteOpen: boolean,
    isDeleteNoteOpen: boolean,
    isNotesLoading: boolean,
    isNoteUpdateLoading: boolean,
    isNoteDeleteLoading: boolean,
    isNotesError: boolean,
    isNoteUpdateError: boolean,
    isNoteDeleteError: boolean,
    setIsAddNewNoteOpen: (val: boolean) => void,
    setCurrentEditNote: (val: Note | null, open: boolean) => void,
    setCurrentDeleteNote: (val: Note | null, open: boolean) => void,
    fetchNotes: () => Promise<void>,
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
    isNoteUpdateLoading: false,
    isNoteDeleteLoading: false,
    isNoteUpdateError: false,
    isNotesError: false,
    isNoteDeleteError: false,
    setIsAddNewNoteOpen: (val: boolean) => {set({isAddNewNoteOpen: val})},
    setCurrentEditNote: (note: Note | null, open: boolean) => {
        set({currentEditNote: note, isAddNewNoteOpen: open});
    },
    setCurrentDeleteNote: (note:  Note | null, open: boolean) => {
       set({currentDeleteNote: note, isDeleteNoteOpen: open});
    },
    fetchNotes: async () => {
        try {
            const response = await fetch("api/notes");

            if(response.ok) {
                const result = await response.json();
                set({notes: result, isNotesLoading: false, isNotesError: false});
            } else {
                set({isNotesLoading: false, isNotesError: true});
            }
        } catch {
            set({isNotesLoading: false, isNotesError: true});
        }
    },
    addNote: async (note: Note) => {
        try {
            set({isNoteUpdateLoading: true});
            const response = await fetch("api/notes", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });

            if(response.ok) {
                const result: Note = await response.json();
                set((state: NotesState) => ({ notes: [result, ...state.notes], isNoteUpdateLoading: false}));
            } else {
                set({isNoteUpdateLoading: false, isNoteUpdateError: true});
            }
        } catch {
            set({isNoteUpdateLoading: false, isNoteUpdateError: true});
        }
    },
    editNote: async (note: Note) => {
        try {
            set({isNoteUpdateLoading: true});
            const response = await fetch("api/notes/"+ note.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });

            if(response.ok) {
                const note: Note = await response.json();

                set((state: NotesState) => {
                    return {
                        notes: state.notes.map(noteItem => noteItem.id === note.id ? {...noteItem,...note} : noteItem),
                        isNoteUpdateLoading: false,
                        isNoteUpdateError: false
                    };
                })
            } else {
                set({isNoteUpdateLoading: false, isNoteUpdateError: true});
            }

        } catch {
            set({isNoteUpdateLoading: false, isNoteUpdateError: true});
        }
    },
    deleteNote: async (noteId: string) => {
        try {
            set({isNoteDeleteLoading: true});
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
                set({isNoteDeleteLoading: false, isNoteDeleteError: true})
            }
        } catch {
            set({isNoteDeleteLoading: false, isNoteDeleteError: true})
        }
    }
}))