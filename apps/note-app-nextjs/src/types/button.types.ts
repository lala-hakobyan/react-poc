export type ButtonProps = {
    button: ButtonConfig,
    onClick?: () => void;
}

export type ButtonConfig ={
    type?: ButtonType;
    label: string;
    style?: ButtonStyle;
    className?: string;
    disabled?: boolean;
    icon?: string;
}

export type ButtonType = 'submit' | 'reset' | 'button' | 'text';

export type ButtonStyle = 'primary' | 'secondary' | 'ghost';
