import React, { ReactNode } from 'react';

export type ModalProps = {
    isOpen: boolean;
    title: string;
    footerActions?: ReactNode;
    children?: ReactNode;
    onClosed?: () => void;
}

export type ModalContent = {
    modalBody: ReactNode;
    modalFooter?: ReactNode;
    modalHeader?: ReactNode;
}

export type SlotComponent = (props: { children: ReactNode }) => React.JSX.Element;

export type ModalCompoundComponent = {
    (props: ModalProps): React.JSX.Element;
    Header: SlotComponent;
    Body: SlotComponent;
    Footer: SlotComponent;
};