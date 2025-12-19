import Image from 'next/image';
import styles from './AdBanner.module.scss';

// 1. Make the component async
export default async function AdBanner() {
  let imageUrl = null;
  const testAccessToken = process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN;

  console.log('Banner');

  try {
    // Simulate API call (replace with your actual fetch)
    const data = await fetch('http://local.react-note-app.com:3000/api/banners/ad',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${testAccessToken}`,
        }
      });
    imageUrl = await data.json();
    //imageUrl = json.url;
    console.log('imageUrl',imageUrl);
  } catch (error) {
    console.error('Failed to load banner:', error);
    return null; // Return null to render nothing on error
  }

  // 2. Fix logic: Only render if we have an image
  if (!imageUrl) return null;

  return (
    <aside className={styles.adBanner}>
      <figure className={styles.adBanner__imageWrapper}>
        <Image src={imageUrl}
          className={styles['adBanner__imageWrapper-img']}
          fill
          sizes="100vw"
          alt="FE Handbook Ad Banner" />
      </figure>
    </aside>
  );
}


