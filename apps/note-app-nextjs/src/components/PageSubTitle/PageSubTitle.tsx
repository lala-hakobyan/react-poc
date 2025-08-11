import styles from './PageSubTitle.module.scss';

export default function PageSubTitle({title}: {title: string}) {
  return (
    <h2 className={styles.pageSubTitle}>{title}</h2>
  )
}