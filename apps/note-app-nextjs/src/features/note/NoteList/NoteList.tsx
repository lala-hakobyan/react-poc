import styles from "./NoteList.module.scss";
import NoteCard from "@/components/NoteCard/NoteCard";
import {Note} from "@/types/note.types";
import Button from "@/components/Button/Button";

export  default function NoteList() {
    const note1: Note = {
        imageUrl: '/assets/images/travel-paris.png',
        title: 'Paris Travel Tips',
        description: `- Visit Eiffel Tower <br/> - Visit Louvre <br/> - Visit Versailles`
    }
    const note2: Note = {
        imageUrl: '/assets/images/travel-paris.jpg',
        title: 'Paris Travel Tips',
        description: `- Visit Eiffel Tower`
    }
    return (
        <>
            <div className={styles.noteList}>
                <div className={styles.noteList__item}>
                    <NoteCard note={note1}></NoteCard>
                </div>
                <div className={styles.noteList__item}>
                    <NoteCard note={note2}></NoteCard>
                </div>
                <div className={styles.noteList__item}>
                    <NoteCard note={note1}></NoteCard>
                </div>
                <div className={styles.noteList__item}>
                    <NoteCard note={note1}></NoteCard>
                </div>
                <div className={styles.noteList__item}>
                    <NoteCard note={note1}></NoteCard>
                </div>
            </div>

            <div className="text-center mt-md">
                <Button button={{label: 'Load More', type: 'button', style: 'ghost'}}></Button>
            </div>
        </>
    )
}