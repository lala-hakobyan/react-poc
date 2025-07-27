export interface ButtonProps {
    type?: ButtonType;
    label: string;
    style?: ButtonStyle;
}

export type ButtonType = 'submit' | 'reset' | 'button';

export type ButtonStyle = 'primary' | 'secondary' | 'ghost';