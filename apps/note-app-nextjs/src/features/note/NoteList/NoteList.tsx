"use client";
import styles from "./NoteList.module.scss";
import NoteCard from "@/components/NoteCard/NoteCard";
import {Note} from "@/types/note.types";
import Button from "@/components/Button/Button";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader/Loader";

export  default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // This will read from next.js route for api/notes, located under: app/api/notes/route.ts
                const response = await fetch("/api/notes");
                if(!response.ok) {
                    throw new Error(`HTTP response error: Status ${response.status}`);
                }

                const result = await response.json();
                setNotes(result);
                setIsLoading(false);
            } catch(error) {
                console.log('Error fetching notes', error);
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {!isLoading &&
                <div className={styles.noteList}>
                    {notes.map((note: Note) => (
                        <div className={styles.noteList__item} key={note.id}>
                            <NoteCard noteCard={{note: note, showImage: true}}></NoteCard>
                        </div>
                    ))}
                </div>
            }

            {isLoading && <Loader></Loader>}

            {!isLoading &&
                <div className="text-center mt-md">
                    <Button button={{label: 'Load More', type: 'button', style: 'ghost'}}></Button>
                </div>
            }
        </>
    )
}