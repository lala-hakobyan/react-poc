import styles from './Button.module.scss';
import {ButtonConfig, ButtonProps} from "@/types/button.types";

export default function Button({button, onClick}: ButtonProps) {
    const defaultButton: ButtonConfig = {
        type: 'button',
        style: 'primary',
        label: '',
        disabled: false,
    }
    const finalButton = {...defaultButton, ...button};
    const initialClassName = `${styles.button} ${styles['button--' + finalButton.style]}`;
    let className = button.className ? `${initialClassName} ${button.className}` : initialClassName;
    className = button.disabled ? `${className} ${styles['button--disabled']}`: `${className}`;

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={finalButton.disabled}
            type={finalButton.type}>
            {finalButton.label}
        </button>
    );
}