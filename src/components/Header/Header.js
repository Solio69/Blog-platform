import React from 'react';
import { Link } from 'react-router-dom';
import { stateUser } from '../../selectors';
import { UserIsNotLoggedIn } from './UserIsNotLoggedIn';
import { UserIsLoggedIn } from './UserIsLoggedIn';
import styles from './Header.module.scss';

const Header = () => {
  const  {userData}  = stateUser();

  // если данные пользвателя есть в стор (пользователь залогинен), то показываем их
  const userDataShow = userData ? <UserIsLoggedIn /> : <UserIsNotLoggedIn />;

  return (
    <div className={styles.header}>
      <Link to="/articles" className={styles.header__title}>
        Realworld Blog
      </Link>
      <div className={styles['header__user-information']}>{userDataShow}</div>
    </div>
  );
};

export { Header };
