import styles from './Button.module.scss';
import {ButtonProps} from "@/types/button.types";

export default function Button({button}: {button: ButtonProps | undefined}) {
    const defaultButton: ButtonProps = {
        type: 'button',
        style: 'primary',
        label: '',
    }
    const finalButton = {...defaultButton, ...button};
    console.log('finalButton', finalButton)
    return (
        <button
            className={`${styles.button} ${styles['button--' + finalButton.style]}`}
            type={finalButton.type}>
            {finalButton.label}
        </button>
    );
}