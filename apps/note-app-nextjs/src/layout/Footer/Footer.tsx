import styles from './Footer.module.scss';
import { Suspense } from 'react';
import AdBanner from '@/components/AdBanner/AdBanner';
import { AdBannerLoader } from '@/components/AdBanner/AdBannerLoader';
import { debugFlags } from '@/debug-experiments/debugFlags';

export default function Footer() {
  return (
    <>
      { debugFlags.enableSuspenseBanner &&
        <Suspense fallback={<AdBannerLoader />}>
          <AdBanner />
        </Suspense>
      }

      <footer className={styles.footer}>
        <p>© 2025 My Notes App POC - Made by <a className="primary-link" href="https://www.linkedin.com/in/lala-hakobyan" target="_blank">Lala Hakobyan</a></p>
      </footer>
    </>
  )
}
