

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserRegistration, errorNull } from '../../store/userSlice';

import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import FormSignUP from '../../components/FormSignUP';
import Loader from '../../components/Loader';

const SignUP = function() {
  const dispath = useDispatch();
  const { error, status, userData } = useSelector((state) => state.user);

  useEffect(() => {
    // если есть днные о юзере, то сохраняет токен в хранилище
    if (userData && userData !== null) {
      localStorage.setItem('token', JSON.stringify(userData.token));
    }
  }, [userData]);

  const userRegistration = (val) => {
    const newUser = {
      username: val.username.trim(),
      email: val.email.trim(),
      password: val.password.trim(),
    };
    // console.log(newUser);
    dispath(fetchUserRegistration(newUser));
  };

  // при закрытии окна ошибки
  const onCloseMessage = () => {
    // обнуляет ошибку в сторе
    dispath(errorNull());
  };
  // сообщение об ошибке
  const errorAlert = error ? <ErrorMessage description={error} callback={onCloseMessage} /> : null;

  // сообщение об успешной регистрации
  const successAlert = userData ? <SuccessMessage description="Registration was successful!" closable={false} /> : null;

  const form = !successAlert && status !== 'loading' ? <FormSignUP callback={userRegistration} /> : null;

  const loading = status === 'loading' ? <Loader /> : null;

  return (
    <>
      {errorAlert}
      {successAlert}
      {form}
      {loading}
    </>
  );
};

export default SignUP;
