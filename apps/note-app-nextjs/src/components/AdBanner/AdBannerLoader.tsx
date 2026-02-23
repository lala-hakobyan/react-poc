import styles from '@/components/AdBanner/AdBanner.module.scss';
import Image from 'next/image';
import { AdBannerConstants } from '@/components/AdBanner/adBanner.data';

export function AdBannerLoader() {
  return (
    <figure className={styles.adBanner__imageWrapper}>
      <Image src={'/assets/images/ad-banner-loading.png'}
        className={styles['adBanner__imageWrapper-img']}
        fill
        sizes="100vw"
        priority={true}
        alt={AdBannerConstants.bannerImageTitle} />
    </figure>
  )
}
