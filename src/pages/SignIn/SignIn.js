
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLogIn, errorNull } from '../../store/userSlice';

import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import FormSignIn from '../../components/FormSignIn';
import Loader from '../../components/Loader';

const SignIn = function (){
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

  // при закрытии окна ошибки
  const onCloseMessage = () => {
    // обнуляет ошибку в сторе
    dispath(errorNull());
  };

  // сообщение об ошибке
  const errorAlert = error ? <ErrorMessage description={error} callback={onCloseMessage} /> : null;

  // сообщение об успешной авторизации
  const successAlert = userData ? (
    <SuccessMessage description="Authorization was successful!" closable={false} />
  ) : null;

  // форма авторизации
  const form = !successAlert && status !== 'loading' ? <FormSignIn callback={userAuthorize} /> : null;

  // индикатор загрузки
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

export default SignIn;
