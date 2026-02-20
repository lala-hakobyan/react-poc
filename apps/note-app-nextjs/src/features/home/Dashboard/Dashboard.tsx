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
import { selectNotesListSlice, useNotesStore } from '@/store/notes/notesStore';
import { useShallow } from 'zustand/react/shallow';
import Alert from '@/components/Alert/Alert';
import { NoteListConstants } from '@/constants/noteList.constants';

const recentNotesSizeConfig = Number(process.env.NEXT_PUBLIC_DASHBOARD_ITEM_COUNT);
const isOfflineModeOn = process.env.NEXT_PUBLIC_ENABLE_OFFLINE_MODE_ON_ERROR === 'true';

export default function Dashboard() {
  const notesListState = useNotesStore(useShallow(selectNotesListSlice));
  const [notes, setNotes] = useState<Note[]>(notesListState.notes.slice(0, recentNotesSizeConfig));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchApiData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await notesApiService.fetchNotes(0, recentNotesSizeConfig, signal);
        setNotes(data);
        setIsLoading(false);
        setIsError(false);
      } catch(error: unknown) {
        loggerService.log({
          type: 'error',
          context: 'dashboard',
          messageType: 'fetchNotes'
        }, null, error as Error);

        setIsLoading(false);
        setIsError(true);
        notesListState.fetchNotesOffline(0, recentNotesSizeConfig, (result) => setNotes(result));
      }
    }

    if(!(notesListState.notes && notesListState.notes.length!==0)) {
      fetchApiData();
    }

    return () => abortController.abort();
  }, [notesListState, notesListState.notes]);

  return (
    <section className={`mb-md ${styles.dashboard}`}>
      <PageSubTitle title={DashboardConstants.subTitle}></PageSubTitle>

      {!isLoading &&
        <>
          {isError && !isOfflineModeOn &&
            <Alert alert={{ type: 'danger', className: 'mb-sm' }}>{NoteListConstants.fetchErrorMessage}</Alert>
          }
          <CardCarousel notes={notes}></CardCarousel>
          <p className="text-right mt-sm"><a href={'/notes'} className="primary-link">View All Notes</a></p>
        </>
      }

      {isLoading && <Loader loader={{ type: 'section' }}></Loader>}
    </section>
  );
}
