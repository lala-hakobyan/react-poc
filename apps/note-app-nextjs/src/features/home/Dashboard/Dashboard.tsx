'use client';
import PageSubTitle from '@/components/PageSubTitle/PageSubTitle';
import CardCarousel from '@/components/CardCarousel/CardCarousel';
import Loader from '@/components/Loader/Loader';
import styles from './Dashboard.module.scss';
import {useEffect, useState} from 'react';
import {Note} from '@/types/note.types';

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const response: Response = await fetch('api/notes?limit=5');
        if(!response.ok) {
          throw new Error(`HTTP response error: Status ${response.status}`)
        }
        const data = await response.json();

        setNotes(data);
        setIsLoading(false);
      } catch(error) {
        console.error('Error fetching notes', error);
        setIsLoading(false);
      }
    }

    getApiData();
  }, []);

  return (
    <section className={`mb-md ${styles.dashboard}`}>
      <PageSubTitle title={'Latest Notes'} ></PageSubTitle>

      {!isLoading && <CardCarousel notes={notes}></CardCarousel>}

      {isLoading && <Loader loader={{type: 'section'}}></Loader>}
    </section>
  );
}