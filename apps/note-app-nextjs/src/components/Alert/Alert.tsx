import styles from './Alert.module.scss';
import { AlertProps } from '@/types/alert.types';
import Icon from '@/components/Icon/Icon';

export default function Alert({ children, alert }: AlertProps) {
  const className = alert.type ? `${styles.alert} ${styles['alert--' + alert.type]}` : styles.alert;
  const iconMapping = {
    danger: 'icon-triangle-exclamation',
    success: 'icon-circle-check',
    warning: 'icon-triangle-exclamation',
    info: 'icon-circle-exclamation'
  }

  return (
    <div className={`${className} ${alert.className}`}>
      {alert.type && !alert.hideIcon &&
        <div className={styles.alert__icon}>
          <Icon icon={{
            iconName: iconMapping[alert.type],
            size: 'sm'
          }} />
        </div>
      }

      <div className={styles.alert__content}>
        {alert.text && <p>{alert.text}</p>}

        {children}
      </div>
    </div>
  )
}
