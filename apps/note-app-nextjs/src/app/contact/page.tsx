import MainLayout from '@/layout/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import Contact from '@/features/contact/Contact';
import PageSubTitle from '@/components/PageSubTitle/PageSubTitle';
import { ContactConstants } from '@/constants/contact.constants';

export default function Page() {
  return (
    <MainLayout size="sm">
      <section>
        <PageTitle title={ContactConstants.pageTitle}></PageTitle>
        <PageSubTitle title={ContactConstants.pageSubtitle} ></PageSubTitle>
        <Contact></Contact>
      </section>
    </MainLayout>
  )
}
