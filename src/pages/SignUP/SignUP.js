import React, { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserRegistration, errorNull } from '../../store/userSlice';
import { useStateUser } from '../../selectors';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SuccessMessage } from '../../components/SuccessMessage';
import { FormSignUP } from '../../components/FormSignUP';
import { Loader } from '../../components/Loader';

const SignUP = memo(() => {
  const dispath = useDispatch();
  const { error, status, userData } = useStateUser();

  useEffect(() => {
    try {
      // если есть днные о юзере, то сохраняет токен в хранилище
      if (userData && userData !== null) {
        localStorage.setItem('token', JSON.stringify(userData.token));
      }
    } catch (e) {
      console.log(e);
    }
  }, [userData]);

  const userRegistration = (val) => {
    const newUser = {
      username: val.username.trim(),
      email: val.email.trim(),
      password: val.password.trim(),
    };
    dispath(fetchUserRegistration(newUser));
  };

  // при закрытии окна ошибки
  const onCloseMessage = () => {
    // обнуляет ошибку в сторе
    dispath(errorNull());
  };
  // сообщение об ошибке
  const errorAlert = error && <ErrorMessage description={error} closingAlert={onCloseMessage} />;

  // сообщение об успешной регистрации
  const successAlert = userData && <SuccessMessage description="Registration was successful!" closable={false} />;

  const form = !successAlert && status !== 'loading' && <FormSignUP callback={userRegistration} />;

  const loading = status === 'loading' && <Loader />;

  return (
    <>
      {errorAlert}
      {successAlert}
      {form}
      {loading}
    </>
  );
});

export { SignUP };
