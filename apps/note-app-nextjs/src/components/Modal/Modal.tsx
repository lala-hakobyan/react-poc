'use client';
import styles from './Modal.module.scss';
import {
  ModalCompoundComponent,
  ModalContent,
  ModalProps,
  ModalSlotType
} from '@/types/modal.types';
import Button from '@/components/Button/Button';
import React, { ReactElement, ReactNode, SyntheticEvent, useEffect, useState } from 'react';

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

  const findSlots = (nodes: ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) return;

      const el = child as ReactElement<{ children?: ReactNode }>;

      // Type guard to ensure el.type is a function (a component)
      if (typeof el.type === 'function') {
        const componentType = el.type as ModalSlotType;

        if (componentType.displayName === 'Modal.Header') {
          modalHeader = el;
        } else if (componentType.displayName === 'Modal.Body') {
          modalBody = el;
        } else if (componentType.displayName === 'Modal.Footer') {
          modalFooter = el;
        }
      }

      if (el.props.children) {
        findSlots(el.props.children);
      }
    });
  };

  findSlots(children);

  return {
    modalHeader,
    modalBody,
    modalFooter,
  };
};

/**
 * Use Compound Components pattern to create compound Modal object
 * @param ModalRoot
 */
const exportModalContent = (ModalRoot: (props: ModalProps) => React.JSX.Element): ModalCompoundComponent => {
  // Modal Content Slots
  const Header = ({ children }: { children: ReactNode }) => <>{children}</>;
  Header.displayName = 'Modal.Header';
  const Body = ({ children }: { children: ReactNode }) => <>{children}</>;
  Body.displayName = 'Modal.Body';
  const Footer = ({ children }: { children: ReactNode }) => <>{children}</>;
  Footer.displayName = 'Modal.Footer';

  // Compound Return
  return Object.assign(ModalRoot, {
    Header,
    Body,
    Footer,
  }) as ModalCompoundComponent;
}

const ModalRoot = ({ children, isOpen, title, onClosed } : ModalProps): React.JSX.Element => {
  const { modalHeader, modalBody, modalFooter } = extractModalContent(children);

  const closeModalAction = (ev?: SyntheticEvent) => {
    setModalClass(modalInactiveClass);
    document.documentElement.classList.remove(`${styles['modal--open']}`);
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

    if(isOpen) {
      document.documentElement.classList.add(`${styles['modal--open']}`);
    }

    setModalClass(modalInitialClass);
  }, [isOpen]);

  return (
    <div className={modalClass} id="modal">
      <div className={styles.modal__overlay} id="modalOverlay">
        <div className={styles.modal__wrapper}>
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
              { modalFooter ? modalFooter : <Button button={{ label: 'Cancel' }} onClick={closeModalAction} ></Button>}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

const Modal = exportModalContent(ModalRoot);

export default Modal;
