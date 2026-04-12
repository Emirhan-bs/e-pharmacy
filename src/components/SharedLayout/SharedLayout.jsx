import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./SharedLayout.module.css";

function SharedLayout() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
export default SharedLayout;    