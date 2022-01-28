import React, { useEffect, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserUpdate, errorNull } from '../../store/userSlice';
import { useStateUser } from '../../selectors';
import { FormEditProfile } from '../../components/FormEditProfile';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SuccessMessage } from '../../components/SuccessMessage';
import { Loader } from '../../components/Loader';

const Profile = memo(() => {
  const dispath = useDispatch();
  const { error, status, userData } = useStateUser();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // если пользователь сохранен в стор
    if (userData) {
      setEmail(userData.email);
      setUsername(userData.username);
      setToken(userData.token);
    }

    if (status === 'loading') {
      setIsSuccess(false);
    }
  }, [status, userData]);

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
      try {
        localStorage.removeItem('token');
        localStorage.setItem('token', JSON.stringify(res.payload.user.token));
        setIsSuccess(true);
      } catch (e) {
        setIsSuccess(false);
        console.log(e);
      }
    });
  };

  // при закрытии окна ошибки
  const onCloseMessage = () => {
    // обнуляет ошибку в сторе
    dispath(errorNull());
  };

  // при закрытии сообщения об успехе
  const atCloseSuccessMessage = () => {
    setIsSuccess(false);
  };

  // сообщение об ошибке
  const errorAlert = error ? <ErrorMessage description={error} closingAlert={onCloseMessage} /> : null;

  // сообщение об успешной авторизации
  const successMessage = isSuccess ? (
    <SuccessMessage description="Profile edit successfully!" closable={true} closingAlert={atCloseSuccessMessage} />
  ) : null;

  // индикатор загрузки
  const loading = status === 'loading' ? <Loader /> : null;

  const form =
    status !== 'loading' ? <FormEditProfile transferData={editProfile} email={email} username={username} /> : null;

  return (
    <>
      {errorAlert}
      {successMessage}
      {form}
      {loading}
    </>
  );
});

export { Profile };
