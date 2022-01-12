//
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserRegistration } from '../../store/userSlice';

import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import FormSignUP from '../../components/FormSignUP';
import Loader from '../../components/Loader';

// import styles from '../../FormSignUP/FormSignUP.module.scss';

const SignUP = () => {
  const dispath = useDispatch();
  const { error, status, userData } = useSelector((state) => state.user);

  useEffect(() => {
    // если есть днные о юзере, то сохраняет токен в хранилище
    if (userData && userData !== null) {
      localStorage.setItem('token', JSON.stringify(userData.token));
    }
  }, [userData]);

  const onFinish = (val) => {
    const newUser = {
      username: val.username.trim(),
      email: val.email.trim(),
      password: val.password.trim(),
    };
    // console.log(newUser);
    dispath(fetchUserRegistration(newUser));
  };

  // сообщение об ошибке
  const errorAlert = error ? <ErrorMessage description={error} /> : null;

  // сообщение об успешной авторизации
  const successAlert = userData ? <SuccessMessage description="Registration was successful!" /> : null;

  const form = !successAlert && status !== 'loading' ? <FormSignUP callback={onFinish} /> : null;

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

export default SignUP;
