import { ReactNode } from 'react';

export type AlertConfig = {
    type?: AlertType;
    text?: string;
    className?: string;
    hideIcon?: boolean;
}

export type AlertProps = {
    alert: AlertConfig;
    children?: ReactNode,
}

export type AlertType = 'danger' | 'success' | 'warning' | 'info';
