/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import Header from '../Header';

const Layout = () => {
  return (
    <div className={styles['layout']}>
      <Header />
      <main className={styles['main']}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
