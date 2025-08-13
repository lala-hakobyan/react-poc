import NoteCard from '@/components/NoteCard/NoteCard';
import React, { useCallback, useMemo } from 'react';
import { Note } from '@/types/note.types';
import styles from './NoteList.module.scss';

type NoteItemProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
};

export const NoteItem = React.memo(function NoteItem({ note, onEdit, onDelete }: NoteItemProps) {
  // Stable zero-arg handlers for NoteCard
  const handleEditClick = useCallback(() => {
    onEdit(note);
  }, [onEdit, note]);

  const handleDeleteClick = useCallback(() => {
    onDelete(note);
  }, [onDelete, note]);

  // Optional: keep the noteCard prop stable when note doesn't change
  const noteCardProps = useMemo(
    () => ({ note, showImage: true, showActions: true }),
    [note]
  );

  return (
    <div className={styles.noteList__item}>
      <NoteCard
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        noteCard={noteCardProps}
      />
    </div>
  );
});
