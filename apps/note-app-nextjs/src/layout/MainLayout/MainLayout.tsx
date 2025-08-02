import Header from "@/layout/Header/Header";
import Footer from "@/layout/Footer/Footer";
import {ReactNode} from "react";
import styles from "./MainLayout.module.scss";

export default function MainLayout({children}: {children: ReactNode}) {
    return (
        <>
            <Header></Header>
            <main className={styles.main}>
                {children}
            </main>
            <Footer></Footer>
        </>
    )
}