import { BrowseLabelConfig } from '@/types/browseLabel.types';
import styles from './BrowseLabel.module.scss';

export default function BrowseLabel({ browseLabel }: {browseLabel: BrowseLabelConfig}) {
  return(
    <label className={styles.browseLabel} htmlFor={browseLabel.attributeName}>
      <span className={styles.browseLabel__button}>{browseLabel.buttonName}</span>
      <span className={styles.browseLabel__text}>{browseLabel.text}</span>
    </label>
  )
}
