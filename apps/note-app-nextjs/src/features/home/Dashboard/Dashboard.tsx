'use client';
import PageSubTitle from '@/components/PageSubTitle/PageSubTitle';
import CardCarousel from '@/components/CardCarousel/CardCarousel';
import Loader from '@/components/Loader/Loader';
import styles from './Dashboard.module.scss';
import { useEffect, useState } from 'react';
import { Note } from '@/types/note.types';
import notesApiService from '@/services/notesApiService';
import { DashboardConstants } from '@/constants/dashboard.constants';
import loggerService from '@/services/loggerService';

const recentNotesSizeConfig = Number(process.env.NEXT_PUBLIC_DASHBOARD_ITEM_COUNT);

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getApiData = async () => {
      try {
        const data = await notesApiService.fetchNotes(0, recentNotesSizeConfig);
        setNotes(data);
        setIsLoading(false);
      } catch(error: unknown) {
        loggerService.log({
          type: 'error',
          context: 'dashboard',
          messageType: 'fetchNotes'
        }, null, error as Error);

        setIsLoading(false);
      }
    }

    getApiData();
  }, []);

  return (
    <section className={`mb-md ${styles.dashboard}`}>
      <PageSubTitle title={DashboardConstants.subTitle}></PageSubTitle>

      {!isLoading &&
        <>
          <CardCarousel notes={notes}></CardCarousel>
          <p className="text-right mt-sm"><a href={'/notes'} className="primary-link">View All Notes</a></p>
        </>
      }

      {isLoading && <Loader loader={{ type: 'section' }}></Loader>}
    </section>
  );
}
