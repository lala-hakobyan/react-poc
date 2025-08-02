"use client";
import styles from './Actions.module.scss';
import Button from "@/components/Button/Button";
import AddNote from "@/features/note/AddNote/AddNote";
import {useNotesStore} from "@/store/notesStore";

export default function Actions() {
    const {setIsAddNewNoteOpen} = useNotesStore();

    return (
        <div className={`${styles.actions} mb-sm`}>
            <Button button={{label: 'Add New'}} onClick={() => setIsAddNewNoteOpen(true)}></Button>
            <AddNote></AddNote>
            <svg className={styles.actions__icon} width={30} height={30}>
                <use href="/assets/icons/svg-sprite.svg#icon-sort-up" />
            </svg>
            <svg className={styles.actions__icon} width={30} height={30}>
                <use href="/assets/icons/svg-sprite.svg#icon-filter" />
            </svg>
            <svg className={styles.actions__icon} width={30} height={30}>
                <use href="/assets/icons/svg-sprite.svg#icon-search" />
            </svg>
            <svg className={styles.actions__icon} width={30} height={30}>
                <use href="/assets/icons/svg-sprite.svg#icon-view" />
            </svg>
            <svg className={styles.actions__icon} width={30} height={30}>
                <use href="/assets/icons/svg-sprite.svg#icon-remove" />
            </svg>
            <svg className={styles.actions__icon} width={30} height={30}>
                <use href="/assets/icons/svg-sprite.svg#icon-loading" />
            </svg>
            <svg className={styles.actions__icon} width={30} height={30}>
                <use href="/assets/icons/svg-sprite.svg#icon-edit" />
            </svg>
        </div>
    )
}