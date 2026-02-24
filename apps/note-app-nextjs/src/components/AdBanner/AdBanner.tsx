import Image from 'next/image';
import styles from './AdBanner.module.scss';
import { AdBannerConstants } from '@/components/AdBanner/adBanner.data';

export default async function AdBanner() {
  let imageUrl = null;

  try {
    const data = await fetch(AdBannerConstants.bannerApiUrl,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AdBannerConstants.testAccessToken}`,
        }
      });

    imageUrl = await data.json();
  } catch (error) {
    console.error(AdBannerConstants.loadErrorMessage, error);
    return null; // Return null to render nothing on error
  }

  if (!imageUrl) return null;

  return (
    <aside className={styles.adBanner}>
      <figure className={styles.adBanner__imageWrapper}>
        <a href={AdBannerConstants.bannerLink} target={'_blank'}>
          <Image src={imageUrl}
            className={styles['adBanner__imageWrapper-img']}
            fill
            sizes="100vw"
            alt={AdBannerConstants.bannerImageTitle} />
        </a>
      </figure>
    </aside>
  );
}


