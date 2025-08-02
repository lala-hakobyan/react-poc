import { create } from "zustand";
import {Note} from "@/types/note.types";

type NotesState = {
    notes: Note[],
    isAddNewNoteOpen: boolean,
    isNotesLoading: boolean,
    isNotesError: boolean,
    isNotesUpdateLoading: boolean,
    isNotesUpdateError: boolean,
    setIsAddNewNoteOpen: (val: boolean) => void,
    fetchNotes: () => Promise<void>,
    deleteNotes: () => Promise<void>,
    addNote: (note: Note) => Promise<void>
}
export const useNotesStore = create<NotesState>((set) => ({
    notes: [],
    isAddNewNoteOpen: false,
    isNotesLoading: true,
    isNotesUpdateLoading: false,
    isNotesUpdateError: false,
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
        try {
            set({isNotesUpdateLoading: true});
            const response = await fetch("api/notespop", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            });

            if(response.ok) {
                const result: Note = await response.json();
                set((state: NotesState) => ({ notes: [result, ...state.notes], isNotesUpdateLoading: false}));
            } else {
                set({isNotesUpdateLoading: false, isNotesUpdateError: true});
            }
        } catch {
            set({isNotesUpdateLoading: false, isNotesUpdateError: true});
        }
    }
}))