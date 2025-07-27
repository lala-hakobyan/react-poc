import styles from './NoteCard.module.scss'
import {Note} from "@/types/note.types";
import Image from "next/image";
import {Fragment} from "react";

function parseInput(text: string) {
    return text.split(/<br\s*\/?>/i).map((line, idx) => (
        <Fragment key={idx}>
            {line}
            {idx !== text.split(/<br\s*\/?>/i).length - 1 && <br />}
        </Fragment>
    ));
}

export default function NoteCard({note}: {note: Note}) {
    return (
        <div className={styles.noteCard}>
            {note.imageUrl && (
                <figure className={styles.noteCard__imgWrapper}>
                    <Image
                        className={styles.noteCard__img}
                        src={note.imageUrl}
                        fill
                        alt="My Page"
                        sizes="100vw"/>
                </figure>
            )}
            <div className={styles.noteCard__content}>
                <h3>{note.title}</h3>
                <p>{parseInput(note.description)}</p>
            </div>
        </div>
    )
}