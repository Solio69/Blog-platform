import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useStateUser } from '../../../selectors';
import { logOutUser } from '../../../store/userSlice';
import { HeaderButton } from '../HeaderButton';
import styles from './UserIsLoggedIn.module.scss';
import avatarPlug from '../../../images/avatar-icon.png';

const UserIsLoggedIn = () => {
  const { userData } = useStateUser();
  const { username, image } = userData;

  const dispath = useDispatch();

  const avatar = image || avatarPlug;

  const logOut = () => {
    try {
      // удаляет token из localStorage
      localStorage.removeItem('token');
      // и очищает данные пользователя в сторе
      dispath(logOutUser());
    } catch (e) {
      console.log(e);
    }
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

      <div role="button" tabIndex={0} onClick={logOut} onKeyDown={logOut}>
        <HeaderButton text="Log Out" />
      </div>
    </div>
  );
};

export { UserIsLoggedIn };
