import MainLayout from "@/layout/MainLayout/MainLayout";
import PageTitle from "@/components/PageTitle/PageTitle";
import '../styles/helpers.scss';
import Dashboard from "@/features/home/Dashboard/Dashboard";
import About from "@/features/home/About/About";

export default function Page() {
  return (
    <MainLayout>
      <PageTitle title={'Home Page and Dashboard'}></PageTitle>
      <About></About>
      <Dashboard></Dashboard>
    </MainLayout>
  )
}
