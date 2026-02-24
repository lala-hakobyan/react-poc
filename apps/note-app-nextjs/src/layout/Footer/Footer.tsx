import styles from './Footer.module.scss';
import { GlobalConstants } from '@/constants/global.constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>© {currentYear} My Notes App POC - Made by <a className="primary-link" href={GlobalConstants.linkedinUrl} target="_blank">Lala Hakobyan</a></p>
    </footer>
  )
}
