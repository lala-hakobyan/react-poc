import MainLayout from '@/layout/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import NoteList from '@/features/note/NoteList/NoteList';
import Actions from '@/features/note/Actions/Actions';
import { NoteListConstants } from '@/constants/noteList.constants';


export default function Page() {
  return (
    <MainLayout>
      <section>
        <PageTitle title={NoteListConstants.pageTitle}></PageTitle>
        <Actions></Actions>
        <NoteList></NoteList>
      </section>
    </MainLayout>
  )
}
