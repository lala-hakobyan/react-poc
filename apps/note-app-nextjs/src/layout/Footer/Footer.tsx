import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2025 My Notes App POC - Made by <a className="primary-link" href="https://www.linkedin.com/in/lala-hakobyan-71aa64b8/" target="_blank">Lala Hakobyan</a></p>
    </footer>
  )
}
