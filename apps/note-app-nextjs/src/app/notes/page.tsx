import MainLayout from '@/layout/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import NoteList from '@/features/note/NoteList/NoteList';
import Actions from '@/features/note/Actions/Actions';


export default function Page() {
  return (
    <MainLayout>
      <PageTitle title={'My Notes'}></PageTitle>
      <Actions></Actions>
      <NoteList></NoteList>
    </MainLayout>
  )
}