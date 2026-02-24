import styles from './Footer.module.scss';
import { GlobalConstants } from '@/constants/global.constants';
import { Suspense } from 'react';
import AdBanner from '@/components/AdBanner/AdBanner';
import { AdBannerLoader } from '@/components/AdBanner/AdBannerLoader';
import { debugFlags } from '@/debug-experiments/debugFlags';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      { debugFlags.enableSuspenseBanner &&
        <aside className={styles.aside}>
          <Suspense fallback={<AdBannerLoader />}>
            <AdBanner />
          </Suspense>
        </aside>
      }

      <footer className={styles.footer}>
        <p>© {currentYear} My Notes App POC - Made by <a className="primary-link" href={GlobalConstants.linkedinUrl} target="_blank">Lala Hakobyan</a></p>
      </footer>
    </>
  )
}
