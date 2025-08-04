"use client";
import styles from "./NoteList.module.scss";
import NoteCard from "@/components/NoteCard/NoteCard";
import {Note} from "@/types/note.types";
import Button from "@/components/Button/Button";
import {useEffect} from "react";
import Loader from "@/components/Loader/Loader";
import {useNotesStore} from "@/store/notesStore";
import DeleteNote from "@/features/note/DeleteNote/DeleteNote";

export  default function NoteList() {
    const {
        notes,
        isNotesLoading,
        isNotesError,
        fetchNotes,
        setCurrentEditNote,
        setCurrentDeleteNote
    } = useNotesStore();
    //const [noteDeleteProps, setNoteDeleteProps] = useState<NoteDeleteProps | null>(null);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return (
        <>
            {!isNotesLoading &&
                <>
                    <div className={styles.noteList}>
                        {notes.map((note: Note) => (
                            <div className={styles.noteList__item} key={note.id}>
                                <NoteCard
                                    onEdit={() => setCurrentEditNote(note, true)}
                                    onDelete={() => setCurrentDeleteNote(note, true) }
                                    noteCard={{note: note, showImage: true, showActions: true}}
                                ></NoteCard>
                            </div>
                        ))}
                    </div>
                    <DeleteNote />
                </>
            }

            {isNotesLoading && <Loader></Loader>}

            {!isNotesLoading && !isNotesError &&
                <div className="text-center mt-md">
                    <Button button={{label: 'Load More', type: 'button', style: 'ghost'}}></Button>
                </div>
            }

            {isNotesError && <div className="text-center">Sorry, something went wrong while loading your notes.<br/>Please try again later.</div>}
        </>
    )
}