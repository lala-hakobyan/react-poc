'use client';
import styles from './Actions.module.scss';
import Button from '@/components/Button/Button';
import AddEditNote from '@/features/note/AddEditNote/AddEditNote';
import { useNotesStore } from '@/store/notes/notesStore';
import { useShallow } from 'zustand/react/shallow';
import DeleteNote from '@/features/note/DeleteNote/DeleteNote';
import Icon from '@/components/Icon/Icon';
import { Profiler } from 'react';
import './../../../styles/tooltip.scss';

type ProfilerPhase = 'mount' | 'update' | 'nested-update';

function onRender(id: string, phase: ProfilerPhase, actualDuration: number, baseDuration: number, startTime: number, commitTime: number): void {
  const slowThreshold = 1; // ms
  if (actualDuration > slowThreshold) {
    console.warn(`[Profiler][${id}] ${phase} render took ${actualDuration.toFixed(2)}ms`, {
      baseDuration: baseDuration.toFixed(2),
      startedAt: startTime.toFixed(2),
      committedAt: commitTime.toFixed(2)
    });
  }
}

export default function Actions() {
  const { setIsAddEditModalOpen, isAddEditModalOpen, isDeleteModalOpen } = useNotesStore(useShallow((state) => ({
    setIsAddEditModalOpen: state.setIsAddEditModalOpen,
    isAddEditModalOpen: state.isAddEditModalOpen,
    isDeleteModalOpen: state.isDeleteModalOpen,
    setIsDeleteModalOpen: state.setIsDeleteModalOpen
  })));

  return (
    <Profiler id="profilerActions" onRender={onRender}>
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
    </Profiler>
  )
}
