import styles from './Loader.module.scss';
import { LoaderProps } from '@/types/loader.types';

export default function Loader({ loader }: {loader?: LoaderProps}) {
  const defaultLoaderProps: LoaderProps = {
    type: 'screen'
  }
  const finalLoaderProps = { ...defaultLoaderProps, ...loader };

  return (
    <span className={`${styles.loader} ${styles['loader--' + finalLoaderProps.type]}`}></span>
  );
}