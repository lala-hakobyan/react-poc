import { create } from "zustand";
import {Note} from "@/types/note.types";

type NotesState = {
    notes: Note[],
    isAddNewNoteOpen: boolean,
    isNotesLoading: boolean,
    isNotesError: boolean,
    setIsAddNewNoteOpen: (val: boolean) => void,
    fetchNotes: () => Promise<void>,
    deleteNotes: () => Promise<void>,
    addNote: (note: Note) => Promise<void>
}
export const useNotesStore = create<NotesState>((set) => ({
    notes: [],
    isAddNewNoteOpen: false,
    isNotesLoading: true,
    isNotesError: false,
    setIsAddNewNoteOpen: (val: boolean) => {set({isAddNewNoteOpen: val})},
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
    deleteNotes: async () => {},
    addNote: async (note: Note) => {
        set((state: NotesState) => ({ notes: [note, ...state.notes]}) );
    }
}))