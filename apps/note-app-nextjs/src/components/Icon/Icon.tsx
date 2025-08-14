import styles from './Icon.module.scss';
import { IconConfig } from '@/types/icon.types';

export default function Icon({ icon } : {icon: IconConfig}) {
  const iconSizeMapping = {
    sm: 25,
    md: 30,
    lg: 40
  }

  const styleClass = icon.color ?? 'primary';
  const styleSize = icon.size ?? 'md';

  return (
    <svg
      className={`styles.actions__icon ${styles['icon--' + styleClass]}`}
      width={iconSizeMapping[styleSize]}
      height={iconSizeMapping[styleSize]}
    >
      <use href={`/assets/icons/svg-sprite.svg#`+ icon.iconName}/>
    </svg>
  )
}
