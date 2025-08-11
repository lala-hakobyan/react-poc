'use client';
import styles from './Modal.module.scss';
import {ModalCompoundComponent, ModalContent, ModalProps} from '@/types/modal.types';
import Button from '@/components/Button/Button';
import React, {Children, ReactElement, ReactNode, SyntheticEvent, useEffect, useState} from 'react';

// Moving at top to avoid recreating classes for each rerender
const modalInactiveClass = `${styles.modal}`;
const modalActiveClass = `${styles.modal} ${styles['modal--active']}`;

/**
 * Extract Modal.Header, Modal.Footer and Modal.Body components from the given children
 * @param children - ReactNode component
 */
const extractModalContent = (children: ReactNode): ModalContent => {
  let modalBody: ReactNode = null;
  let modalFooter: ReactNode = null;
  let modalHeader: ReactNode = null;

  Children.forEach((children), (child) => {
    if(React.isValidElement(child)) {
      const element = child as ReactElement;

      if(element.type === Modal.Header) {
        modalHeader = element;
      }
      if(element.type === Modal.Body) {
        modalBody = element;
      }
      if(element.type === Modal.Footer) {
        modalFooter = element;
      }
    }
  })

  return {
    modalHeader,
    modalBody,
    modalFooter
  }
}

/**
 * Use Compound Components pattern to create compound Modal object
 * @param ModalRoot
 */
const exportModalContent = (ModalRoot: (props: ModalProps) => React.JSX.Element): ModalCompoundComponent => {
  // Modal Content Slots
  const Header = ({ children }: { children: ReactNode }) => <>{children}</>;
  const Body = ({ children }: { children: ReactNode }) => <>{children}</>;
  const Footer = ({ children }: { children: ReactNode }) => <>{children}</>;

  // Compound Return
  return Object.assign(ModalRoot, {
    Header,
    Body,
    Footer,
  }) as ModalCompoundComponent;
}

const ModalRoot = ({children, isOpen, title, onClosed} : ModalProps): React.JSX.Element => {
  const {modalHeader, modalBody, modalFooter} = extractModalContent(children);

  const closeModalAction = (ev?: SyntheticEvent) => {
    setModalClass(modalInactiveClass)
    if(ev) {
      ev.preventDefault();
    }
    if(onClosed) {
      onClosed();
    }
  }

  const [modalClass, setModalClass] = useState(modalInactiveClass);

  useEffect(() => {
    const modalInitialClass = isOpen ? modalActiveClass : modalInactiveClass;
    setModalClass(modalInitialClass);
  }, [isOpen]);

  return (
    <div className={modalClass} id="modal">
      <div className={styles.modal__overlay} id="modalOverlay"></div>

      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          {modalHeader ? modalHeader :
            <>
              <h2 className={styles.modal__title}>{title}</h2>
              <a href="#" className={styles.modal__closeLink} onClick={(ev: SyntheticEvent) => closeModalAction(ev)}>
                <svg className={styles.modal__closeIcon} width={30} height={30}>
                  <use href="/assets/icons/svg-sprite.svg#icon-close" />
                </svg>
              </a>
            </>
          }
        </div>

        <div className={styles.modal__body}>
          {modalBody}
        </div>

        <div className={styles.modal__footer}>
          { modalFooter ? modalFooter : <Button button={{label: 'Cancel'}} onClick={closeModalAction} ></Button>}
        </div>
      </div>
    </div>
  )
}

const Modal = exportModalContent(ModalRoot);

export default Modal;