import Header from '@/layout/Header/Header';
import Footer from '@/layout/Footer/Footer';
import {ReactNode} from 'react';
import styles from './MainLayout.module.scss';
import {LayoutSize} from '@/types/layout.types';

export default function MainLayout({children, size}: {children: ReactNode, size?: LayoutSize}) {
  const className = size ? `${styles.main} ${styles['main--' + size]}` : styles.main;
  return (
    <>
      <Header></Header>
      <main className={className}>
        {children}
      </main>
      <Footer></Footer>
    </>
  )
}