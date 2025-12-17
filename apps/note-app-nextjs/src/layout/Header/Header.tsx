'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss'
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Image src="/assets/images/my-notes-logo.png" alt="My Page" width="178" height="58" />
      </div>
      <nav className={styles.header__nav}>
        <ul className={styles.header__navList}>
          <li className={styles.header__navListItem}>
            <Link
              className={
                pathname === '/'
                  ? `${styles.header__navListItemLink} ${styles.header__navListItemLinkActive}`
                  : `${styles.header__navListItemLink}`
              }
              href="/">
                            Home
            </Link>
          </li>
          <li className={styles.header__navListItem}>
            <Link
              className={
                pathname === '/notes'
                  ? `${styles.header__navListItemLink} ${styles.header__navListItemLinkActive} prerender`
                  : `${styles.header__navListItemLink} prerender`
              }
              href="/notes">
                            My Notes
            </Link>
          </li>
          <li className={styles.header__navListItem}>
            <Link
              className={
                pathname === '/contact'
                  ? `${styles.header__navListItemLink} ${styles.header__navListItemLinkActive} prefetch prerender-hover`
                  : `${styles.header__navListItemLink} prefetch prerender-hover`
              }
              href="/contact">
                            Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
