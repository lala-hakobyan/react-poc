import styles from './CardCarousel.module.scss';
import NoteCard from "@/components/NoteCard/NoteCard";
import {Note} from "@/types/note.types";

export default function CardCarousel() {
    const note1: Note = {
        imageUrl: '/assets/images/travel-paris.png',
        title: 'Paris Travel Tips',
        description: `- Visit Eyffel Tower <br/> - Visit Louvre <br/> - Visit Versailles`
    }

    return (
        <ul className={styles.cardCarousel}>
            <li className={styles.cardCarousel__item}>
                <NoteCard note={note1}></NoteCard>
            </li>
            <li className={styles.cardCarousel__item}>
                <NoteCard note={note1}></NoteCard>
            </li>
            <li className={styles.cardCarousel__item}>
                <NoteCard note={note1}></NoteCard>
            </li>
            <li className={styles.cardCarousel__item}>
                <NoteCard note={note1}></NoteCard>
            </li>
            <li className={styles.cardCarousel__item}>
                <NoteCard note={note1}></NoteCard>
            </li>
        </ul>
    )
}