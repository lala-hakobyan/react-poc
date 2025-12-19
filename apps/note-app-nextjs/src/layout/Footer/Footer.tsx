import styles from './Footer.module.scss';
import { Suspense } from 'react';
import AdBanner from '@/components/AdBanner/AdBanner';
import { AdBannerLoader } from '@/components/AdBanner/adBannerLoader';

export default function Footer() {
  return (
    <>
      <Suspense fallback={<AdBannerLoader />}>
        <AdBanner />
      </Suspense>
      <footer className={styles.footer}>
        <p>© 2025 My Notes App POC - Made by <a className="primary-link" href="https://www.linkedin.com/in/lala-hakobyan-71aa64b8/" target="_blank">Lala Hakobyan</a></p>
      </footer>
    </>
  )
}
