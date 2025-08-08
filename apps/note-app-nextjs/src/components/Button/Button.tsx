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
            {finalButton.icon &&
                <svg className={styles.button__svgIcon} width={20} height={20}>
                    <use href={`/assets/icons/svg-sprite.svg#${finalButton.icon}`}/>
                </svg>
            }
            {finalButton.label}
        </button>
    );
}