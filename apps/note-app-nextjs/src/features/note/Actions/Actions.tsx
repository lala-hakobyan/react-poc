'use client';
import styles from './Actions.module.scss';
import Button from '@/components/Button/Button';
import AddEditNote from '@/features/note/AddEditNote/AddEditNote';
import { useNotesStore } from '@/store/notes/notesStore';
import { useShallow } from 'zustand/react/shallow';

export default function Actions() {
  const { setIsAddEditModalOpen, isAddEditModalOpen } = useNotesStore(useShallow((state) => ({
    setIsAddEditModalOpen: state.setIsAddEditModalOpen,
    isAddEditModalOpen: state.isAddEditModalOpen
  })));

  return (
    <div className={`${styles.actions} mb-sm`}>
      <Button button={{ label: 'Add New' }} onClick={() => setIsAddEditModalOpen(true)}></Button>
      {isAddEditModalOpen && <AddEditNote></AddEditNote>}
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
