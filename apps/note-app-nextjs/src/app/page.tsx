import MainLayout from '@/layout/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import '../styles/helpers.scss';
import Dashboard from '@/features/home/Dashboard/Dashboard';
import About from '@/features/home/About/About';
import { AboutConstants } from '@/constants/about.constants';
import ServiceWorkerRegister from '@/utils/serviceWorkerRegister';

export default function Page() {
  return (
    <MainLayout>
      <PageTitle title={AboutConstants.pageTitle}></PageTitle>
      <About></About>
      <ServiceWorkerRegister />
      <Dashboard></Dashboard>
    </MainLayout>
  )
}
