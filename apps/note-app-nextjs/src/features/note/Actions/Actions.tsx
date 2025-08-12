'use client';
import styles from './Actions.module.scss';
import Button from '@/components/Button/Button';
import AddEditNote from '@/features/note/AddEditNote/AddEditNote';
import { useNotesStore } from '@/store/notesStore';

export default function Actions() {
  const { setIsAddNewNoteOpen } = useNotesStore();

  return (
    <div className={`${styles.actions} mb-sm`}>
      <Button button={{ label: 'Add New' }} onClick={() => setIsAddNewNoteOpen(true)}></Button>
      <AddEditNote></AddEditNote>
      <svg className={styles.actions__icon} width={30} height={30}>
        <use href="/assets/icons/svg-sprite.svg#icon-sort-up" />
      </svg>
      <svg className={styles.actions__icon} width={30} height={30}>
        <use href="/assets/icons/svg-sprite.svg#icon-filter" />
      </svg>
      <svg className={styles.actions__icon} width={30} height={30}>
        <use href="/assets/icons/svg-sprite.svg#icon-search" />
      </svg>
    </div>
  )
}
