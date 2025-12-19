import styles from '@/components/AdBanner/AdBanner.module.scss';
import Image from 'next/image';

export function AdBannerLoader() {
  return (
    <figure className={styles.adBanner__imageWrapper}>
      <Image src={'/assets/images/banner-loading.png'}
        className={styles['adBanner__imageWrapper-img']}
        fill
        sizes="100vw"
        priority={true}
        alt="FE Debugging Handbook Ad Banner" />
    </figure>
    // <div className={styles.adBanner__loader}>
    //   <p>LOADING SPONSORED <br/> CONTENT...</p>
    // </div>
  )
}
