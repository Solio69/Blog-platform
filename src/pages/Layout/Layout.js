/* eslint-disable react/function-component-definition */
/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */

import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';

import Header from '../../components/Header';

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
