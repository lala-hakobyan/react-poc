import PageSubTitle from '@/components/PageSubTitle/PageSubTitle';
import styles from './About.module.scss';

export default function About() {
  return (
    <section className={`${styles.about} mb-md`}>
      <PageSubTitle title={'Welcome to My Notes!'} ></PageSubTitle>
      <p>My Notes is a free POC app that lets you quickly create, update, and delete notes. You can also view them in different layouts and use various search options.</p>
      <ul className={styles.about__list}>
        <li className={styles.about__listItem}>
          <p>Please note: this is just a proof of concept. It loads a dummy note list by default and doesn’t use a real backend or database.</p>
        </li>
        <li className={styles.about__listItem}>
          <p>You can clear all notes and start fresh, but since there’s no backend, your data will be lost if you clear the cache or use incognito mode.</p>
        </li>
        <li className={styles.about__listItem}>
          <p>Use the button below to reset the app to its original state.</p>
        </li>
        <li className={styles.about__listItem}>
          <p>If you have any questions or find a bug, feel free to reach out.</p>
        </li>
      </ul>
    </section>
  );
}