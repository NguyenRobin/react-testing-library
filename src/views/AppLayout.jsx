import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import styles from '../styles/AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.AppLayout}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
