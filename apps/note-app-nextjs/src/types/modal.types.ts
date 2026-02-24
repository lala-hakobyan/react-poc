import { ReactNode, SyntheticEvent } from 'react';

export type ModalProps = {
    isOpen: boolean;
    title: string;
    footerActions?: ReactNode;
    children?: ReactNode;
    onClosed?: () => void;
}

export type ModalRef = { close: () => void };

export type ModalContextType = {
  close: (ev?: SyntheticEvent) => void,
  title: string
}
