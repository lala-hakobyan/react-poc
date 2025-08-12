'use client';
import PageSubTitle from '@/components/PageSubTitle/PageSubTitle';
import CardCarousel from '@/components/CardCarousel/CardCarousel';
import Loader from '@/components/Loader/Loader';
import styles from './Dashboard.module.scss';
import { useEffect, useState } from 'react';
import { Note } from '@/types/note.types';
import notesApiService from '@/services/notesApiService';
import { LogMessagesConstants } from '@/constants/logMessages.constants';
import { DashboardConstants } from '@/constants/dashboard.constants';

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const data = await notesApiService.fetchNotes(0, 5);
        setNotes(data);
        setIsLoading(false);
      } catch(error) {
        console.error(LogMessagesConstants.notes.fetchError, error);
        setIsLoading(false);
      }
    }

    getApiData();
  }, []);

  return (
    <section className={`mb-md ${styles.dashboard}`}>
      <PageSubTitle title={DashboardConstants.subTitle}></PageSubTitle>

      {!isLoading && <CardCarousel notes={notes}></CardCarousel>}

      {isLoading && <Loader loader={{ type: 'section' }}></Loader>}
    </section>
  );
}
