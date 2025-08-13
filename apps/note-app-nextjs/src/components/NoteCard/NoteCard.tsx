import styles from './NoteCard.module.scss'
import Image from 'next/image';
import React, { Fragment, SyntheticEvent } from 'react';
import { NoteCardProps } from '@/types/noteCard.types';

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

const  NoteCardComponent = ({ noteCard, onEdit, onDelete }: NoteCardProps) => {
  const onEditAction = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if(onEdit) {
      onEdit();
    }
  }

  const onDeleteAction = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if(onDelete) {
      onDelete();
    }
  }

  return (
    <div className={styles.noteCard}>
      {noteCard.showImage && noteCard.note.image && (
        <figure className="imageWrapper">
          <Image
            className="imageWrapper__img"
            src={noteCard.note.image}
            fill
            alt="My Page"
            sizes="100vw"/>
        </figure>
      )}
      {noteCard.showActions &&
         <div className={styles.noteCard__actions}>
           {noteCard.note.link &&
                <a href={noteCard.note.link} className="ml-xs svg-link" target="_blank">
                  <svg className={styles.actions__icon} width={30} height={30}>
                    <use href="/assets/icons/svg-sprite.svg#icon-link" />
                  </svg>
                </a>
           }
           <a href="#" onClick={onEditAction} className="ml-xs svg-link">
             <svg className={styles.actions__icon} width={30} height={30}>
               <use href="/assets/icons/svg-sprite.svg#icon-edit" />
             </svg>
           </a>
           <a href="#" onClick={onDeleteAction} className="ml-xs svg-link">
             <svg className={styles.actions__icon} width={30} height={30}>
               <use href="/assets/icons/svg-sprite.svg#icon-trash" />
             </svg>
           </a>
         </div>
      }
      <div className={styles.noteCard__content}>
        <h3>{noteCard.note.title}</h3>
        <p>{displayText(noteCard.note.description)}</p>
      </div>
    </div>
  )
};

export const NoteCard = React.memo(NoteCardComponent);
