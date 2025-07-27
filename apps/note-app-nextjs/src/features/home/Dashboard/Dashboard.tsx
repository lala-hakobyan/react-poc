import PageSubTitle from "@/components/PageSubTitle/PageSubTitle";
import CardCarousel from "@/components/CardCarousel/CardCarousel";

export default function Dashboard() {
    return (
        <section className="mb-md">
            <PageSubTitle title={'Latest Notes'} ></PageSubTitle>
            <CardCarousel></CardCarousel>
        </section>
    );
}