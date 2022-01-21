/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { logOutUser } from '../../store/userSlice';

import HeaderButton from '../HeaderButton';

import styles from './UserIsLoggedIn.module.scss';

import avatarPlug from '../../images/avatar-icon.png';

const UserIsLoggedIn = function () {
  const { userData } = useSelector((state) => state.user);
  const { username, image } = userData;
  const dispath = useDispatch();

  const avatar = image ? image : avatarPlug;

  const logOut = () => {
    // удаляет token из localStorage
    localStorage.removeItem('token');

    // и очищает данные пользователя в сторе
    dispath(logOutUser());
  };

  return (
    <div className={styles['user-data']}>
      <Link to="/new-article">
        <button type="button" className={styles['user-data__button']}>
          Create article
        </button>
      </Link>

      <Link to="/profile">
        <div className={styles['user-data__wrapper-inner']}>
          <span>{username}</span>
          <img src={avatar} alt="avatar" />
        </div>
      </Link>

      <div onClick={logOut}>
        <HeaderButton text="Log Out" />
      </div>
    </div>
  );
};

export default UserIsLoggedIn;
