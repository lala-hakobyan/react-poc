import styles from './PageTitle.module.scss';

export default function PageTitle({ title }: {title: string}) {
  return (
    <h1 className={styles.pageTitle}>{title}</h1>
  )
}