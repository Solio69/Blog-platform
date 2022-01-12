/* eslint-disable no-undef */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import FormSignIn from '../../components/FormSignIn';
import Loader from '../../components/Loader';

import { fetchUserLogIn } from '../../store/userSlice';

const SignIn = () => {
  const dispath = useDispatch();
  const { error, status, userData } = useSelector((state) => state.user);

  useEffect(() => {
    // если есть днные о юзере, то сохраняет токен в хранилище
    if (userData && userData !== null) {
      localStorage.setItem('token', JSON.stringify(userData.token));
    }
  }, [userData]);

  // получает данные их формы
  const userAuthorize = (val) => {
    const registrationData = {
      email: val.email.trim(),
      password: val.password.trim(),
    };
    // отправлет на сервер
    dispath(fetchUserLogIn(registrationData));
  };

  // сообщение об ошибке
  const errorAlert = error ? <ErrorMessage description={error} /> : null;

  // сообщение об успешной авторизации
  const successAlert = userData ? <SuccessMessage description="Authorization was successful!" /> : null;

  // форма авторизации
  const form = !successAlert && status !== 'loading' ? <FormSignIn callback={userAuthorize} /> : null;

  // индикатор загрузки
  const loading = status === 'loading' ? <Loader /> : null;

  return (
    <React.Fragment>
      {errorAlert}
      {successAlert}
      {form}
      {loading}
    </React.Fragment>
  );
};

export default SignIn;
