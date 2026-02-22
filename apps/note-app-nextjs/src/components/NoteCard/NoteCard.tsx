import styles from './NoteCard.module.scss'
import Image from 'next/image';
import React, { Fragment, memo, SyntheticEvent } from 'react';
import { NoteCardProps } from '@/types/noteCard.types';
import Icon from '@/components/Icon/Icon';

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

const NoteCardComponent : React.FC<NoteCardProps> = ({ noteCard, onEdit, onDelete }: NoteCardProps) =>
{
  const onEditAction = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (onEdit) {
      onEdit();
    }
  }

  const onDeleteAction = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (onDelete) {
      onDelete();
    }
  }

  return (
    <article className={styles.noteCard} data-id={noteCard.dataId}>
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
              <Icon icon={{ iconName: 'icon-link' }} />
            </a>
          }
          {!noteCard.isReadonly &&
          <>
            <a href="#" onClick={onEditAction} className="ml-xs svg-link">
              <Icon icon={{ iconName: 'icon-edit' }} />
            </a>

            <a href="#" onClick={onDeleteAction} className="ml-xs svg-link">
              <Icon icon={{ iconName: 'icon-trash' }} />
            </a>
          </>
          }
        </div>
      }
      <div className={styles.noteCard__content}>
        <h3>{noteCard.note.title}</h3>
        <p>{displayText(noteCard.note.description)}</p>
      </div>
    </article>
  )
};

export const NoteCard = memo(NoteCardComponent);
