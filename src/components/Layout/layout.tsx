import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import styles from "../css/Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet /> {/* This renders the current page */}
      </main>
      <Footer />
    </div>
  );
}