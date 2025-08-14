import PageSubTitle from '@/components/PageSubTitle/PageSubTitle';
import styles from './About.module.scss';
import { AboutConstants } from '@/constants/about.constants';
import { GlobalConstants } from '@/constants/global.constants';

export default function About() {
  return (
    <section className={`${styles.about} mb-md`}>
      <PageSubTitle title={AboutConstants.pageSubtitle} ></PageSubTitle>
      <p>My Notes is a free POC app that lets you quickly create, update, and delete notes. You can also view them in different layouts and use various search options.</p>
      <ul className={styles.about__list}>
        <li className={styles.about__listItem}>
          <p>Please note: this is just a proof of concept. It loads a dummy note list by default from backend and doesn’t use a real database on backend side.</p>
        </li>
        <li className={styles.about__listItem}>
          <p>You can play around with the app: add, edit and remove notes. However, please <strong>do not enter any sensitive information because there is no any authentication on backend side.</strong> Also, your notes will be stored per session and you would lose them when server is restarted.</p>
        </li>
        <li className={styles.about__listItem}>
          <p>If you have any questions or find a bug, feel free to reach out via <a className="primary-link" href="/contact">Contact page</a> or via <a className="primary-link" target="_blank" href={GlobalConstants.linkedinUrl}>Linkedin</a>.</p>
        </li>
      </ul>
    </section>
  );
}
