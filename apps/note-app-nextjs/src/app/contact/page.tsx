import MainLayout from "@/layout/MainLayout/MainLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import Contact from "@/features/contact/Contact";
import PageSubTitle from "@/components/PageSubTitle/PageSubTitle";

export default function Page() {
    return (
        <MainLayout size="sm">
            <PageTitle title={'Contact us / Report and Issue'}></PageTitle>
            <PageSubTitle title={'If you encounter any issues, have feedback, or have questions, feel free to drop a message.'} ></PageSubTitle>
            <Contact></Contact>
        </MainLayout>
    )
}