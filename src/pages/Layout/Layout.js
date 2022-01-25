import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { Header } from '../../components/Header';

const Layout = memo(() => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
});

export { Layout };
