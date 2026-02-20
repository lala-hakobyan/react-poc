'use client';
import styles from './Actions.module.scss';
import Button from '@/components/Button/Button';
import AddEditNote from '@/features/note/AddEditNote/AddEditNote';
import { useNotesStore } from '@/store/notes/notesStore';
import { useShallow } from 'zustand/react/shallow';
import DeleteNote from '@/features/note/DeleteNote/DeleteNote';
import Icon from '@/components/Icon/Icon';
import './../../../styles/tooltip.scss';


export default function Actions() {
  const { setIsAddEditModalOpen, isAddEditModalOpen, isDeleteModalOpen } = useNotesStore(useShallow((state) => ({
    setIsAddEditModalOpen: state.setIsAddEditModalOpen,
    isAddEditModalOpen: state.isAddEditModalOpen,
    isDeleteModalOpen: state.isDeleteModalOpen,
    setIsDeleteModalOpen: state.setIsDeleteModalOpen
  })));

  return (
    <div className={`${styles.actions} mb-sm`}>
      <Button button={{ label: 'Add New' }} onClick={() => setIsAddEditModalOpen(true)}></Button>

      {isAddEditModalOpen && <AddEditNote></AddEditNote>}

      {isDeleteModalOpen && <DeleteNote />}

      <a href="#" className={`${styles.actions__iconLink} svg-link tooltip`} data-tooltip={'Coming soon...'}>
        <Icon icon={{ iconName: 'icon-sort-up', color: 'secondary' }} />
      </a>

      <a href="#" className={`${styles.actions__iconLink} svg-link tooltip`} data-tooltip={'Coming soon...'}>
        <Icon icon={{ iconName: 'icon-filter', color: 'secondary' }} />
      </a>

      <a href="#" className={`${styles.actions__iconLink} svg-link tooltip`} data-tooltip={'Coming soon...'}>
        <Icon icon={{ iconName: 'icon-search', color: 'secondary' }} />
      </a>
    </div>
  )
}
