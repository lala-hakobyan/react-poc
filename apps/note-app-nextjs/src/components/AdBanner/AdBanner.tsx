import Image from 'next/image';
import styles from './AdBanner.module.scss';

export default async function AdBanner() {
  let imageUrl = null;
  const testAccessToken = process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN;

  try {
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
  } catch (error) {
    console.error('Failed to load banner:', error);
    return null; // Return null to render nothing on error
  }

  if (!imageUrl) return null;

  return (
    <aside className={styles.adBanner}>
      <figure className={styles.adBanner__imageWrapper}>
        <a href={'https://github.com/lala-hakobyan/front-end-debugging-handbook'} target={'_blank'}>
          <Image src={imageUrl}
            className={styles['adBanner__imageWrapper-img']}
            fill
            sizes="100vw"
            alt="Front-end Debugging Handbook Ad Banner" />
        </a>
      </figure>
    </aside>
  );
}


