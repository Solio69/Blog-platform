/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

import UserIsNotRegistered from '../UserIsNotRegistered/UserIsNotRegistered';

const Header = function () {
  return (
    <div className={styles.header}>
      <Link to="/articles" className={styles['header__title']}>
        Realworld Blog
      </Link>
      <div className={styles['header__user-information']}>
        <UserIsNotRegistered />
      </div>
    </div>
  );
};

export default Header;
