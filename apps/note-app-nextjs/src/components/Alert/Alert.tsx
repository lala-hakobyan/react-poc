import styles from './Alert.module.scss';
import {AlertProps} from "@/types/alert.types";

export default function Alert({children, alert}: AlertProps) {
    const className = alert.type ? `${styles.alert} ${styles['alert--' + alert.type]}` : styles.alert;
    return (
        <div className={className}>
            {alert.text && <p>{alert.text}</p>}
            {children}
        </div>
    )
}