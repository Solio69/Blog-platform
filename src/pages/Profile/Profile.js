/* eslint-disable no-undef */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-console */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Spin } from 'antd';

import { fetchUserUpdate } from '../../store/userSlice';

import FormEditProfile from '../../components/FormEditProfile';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';

const Profile = () => {
  const dispath = useDispatch();
  const { error, status, userData } = useSelector((state) => state.user);

  const { email, username, token } = userData;

  const [successEdit, setSuccessEdit] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      setSuccessEdit(false);
    }
  }, [status]);

  const editProfile = (val) => {
    // сохраняет предыдущие данные пользователя
    const newUser = { ...userData };
    for (const prop in val) {
      // если новые данные не равны пустой строке или undefined
      if (val[prop] !== '' && val[prop] !== undefined) {
        // то изменяет их
        newUser[prop] = val[prop];
      }
    }
    dispath(fetchUserUpdate({ newUser, token })).then((res) => {
      // console.log(res.payload.user.token)

      localStorage.removeItem('token');
      localStorage.setItem('token', JSON.stringify(res.payload.user.token));
      setSuccessEdit(true);
    });
  };

  // сообщение об ошибке
  const errorAlert = error ? <ErrorMessage description={error} /> : null;

  // сообщение об успешной авторизации
  const successAlert = successEdit ? <SuccessMessage description="Profile edit successfully!" /> : null;

  // индикатор загрузки
  const loading = status === 'loading' ? <Spin className={styles['ant-spin']} size="large" /> : null;

  const form =
    status !== 'loading' ? <FormEditProfile callback={editProfile} email={email} username={username} /> : null;

  return (
    <React.Fragment>
      {errorAlert}
      {successAlert}
      {form}
      {loading}
    </React.Fragment>
  );
};

export default Profile;
