'use client';
import styles from './Modal.module.scss';
import {
  ModalContextType,
  ModalRef,
  ModalProps,
} from '@/types/modal.types';
import Button from '@/components/Button/Button';
import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  ReactNode,
  SyntheticEvent,
  useContext,
  useEffect, useImperativeHandle,
  useState
} from 'react';

// Moving at top to avoid recreating classes for each rerender
const modalInactiveClass = `${styles.modal}`;
const modalActiveClass = `${styles.modal} ${styles['modal--active']}`;

const ModalContext  = createContext<ModalContextType | null>(null);

const ModalBase = forwardRef<ModalRef, ModalProps>(function ModalNew({ children, isOpen, title, onClosed }, ref: ForwardedRef<ModalRef>) {
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

  useImperativeHandle(ref, () => ({ close: closeModalAction }));

  useEffect(() => {
    const modalInitialClass = isOpen ? modalActiveClass : modalInactiveClass;

    if(isOpen) {
      document.documentElement.classList.add(`${styles['modal--open']}`);
    }

    setModalClass(modalInitialClass);
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ close: closeModalAction, title }}>
      <div className={modalClass} id="modal">
        <div className={styles.modal__overlay} id="modalOverlay">
          <div className={styles.modal__wrapper}>
            <div className={styles.modal__content}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
});

const Header = ({ children }: { children?: ReactNode }) => {
  const context = useContext(ModalContext);
  if(!context) throw new Error('Header is not inside ModalOld.');
  const { close, title } = context;

  return (
    <div className={styles.modal__header}>
      {children ? children :
        <>
          <h2 className={styles.modal__title}>{title}</h2>
          <a href="#" className={styles.modal__closeLink} onClick={(ev: SyntheticEvent) => close(ev)}>
            <svg className={styles.modal__closeIcon} width={30} height={30}>
              <use href="/assets/icons/svg-sprite.svg#icon-close" />
            </svg>
          </a>
        </>
      }
    </div>
  );
}

const Body = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.modal__body}>
      {children}
    </div>
  )
}

const Footer = ({ children }: { children: ReactNode }) => {
  const context = useContext(ModalContext);
  if(!context) throw new Error('Footer is not inside ModalOld.');
  const { close } = context;

  return (
    <div className={styles.modal__footer}>
      { children ? children : <Button button={{ label: 'Cancel' }} onClick={(ev?: SyntheticEvent) => close(ev)} ></Button>}
    </div>
  )
}

const Modal = Object.assign(ModalBase, {
  Header,
  Footer,
  Body,
});

export default Modal;
