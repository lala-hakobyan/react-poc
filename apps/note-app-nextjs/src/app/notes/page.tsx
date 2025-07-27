import MainLayout from "@/layout/MainLayout/MainLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import NoteList from "@/features/note/NoteList/NoteList";
import '../../styles/helpers.scss';

export default function Page() {
    return (
        <MainLayout>
            <PageTitle title={'My Notes'}></PageTitle>
            <NoteList></NoteList>
        </MainLayout>
    )
}