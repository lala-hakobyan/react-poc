import styles from './CardCarousel.module.scss';
import NoteCard from '@/components/NoteCard/NoteCard';
import {Note} from '@/types/note.types';

export default function CardCarousel({notes} : {notes: Note[]}) {
  return (
    <ul className={styles.cardCarousel}>
      {notes.map(note => (
        <li className={styles.cardCarousel__item} key={note.id}>
          <NoteCard noteCard={{note: note}}></NoteCard>
        </li>
      ))}
    </ul>
  )
}