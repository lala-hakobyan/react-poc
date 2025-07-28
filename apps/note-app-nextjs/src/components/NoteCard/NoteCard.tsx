import styles from './NoteCard.module.scss'
import Image from "next/image";
import {Fragment} from "react";
import {NoteCardProps} from "@/types/noteCard.types";

function displayText(text:string) {
    const lines = text.split('\n');
    return (
        <>
        {lines.map((line, index) => (
                <Fragment key={index}>
                    <span>{line}</span>
                    {index < lines.length - 1 && <br/>}
                </Fragment>
            ))
        }
        </>
    )
}

export default function NoteCard({noteCard}: {noteCard: NoteCardProps}) {
    return (
        <div className={styles.noteCard}>
            {noteCard.showImage && noteCard.note.imageUrl && (
                <figure className={styles.noteCard__imgWrapper}>
                    <Image
                        className={styles.noteCard__img}
                        src={noteCard.note.imageUrl}
                        fill
                        alt="My Page"
                        sizes="100vw"/>
                </figure>
            )}
            <div className={styles.noteCard__content}>
                <h3>{noteCard.note.title}</h3>
                <p>{displayText(noteCard.note.description)}</p>
            </div>
        </div>
    )
}