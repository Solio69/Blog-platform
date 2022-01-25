import React, { useState, memo } from 'react';
import { FormArticle } from '../../components/FormArticle';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SuccessMessage } from '../../components/SuccessMessage';
import { Loader } from '../../components/Loader';
import { apiService } from '../../services/apiService';

const CreateArticle = memo(() => {
  const [isLoading, setLoading] = useState(false); // отображение лоадера
  const [isError, setIsError] = useState(false); // отобажение ошибки
  const [errorText, setErrorText] = useState(''); // текст ошибки
  const [isSuccessAlert, setSuccessAlert] = useState(false); // отображение лоадера

  // создает стаью используя токен из хранилища
  const createArticle = (val) => {
    const newArticle = {
      title: val.title.trim(),
      description: val.description.trim(),
      body: val.body,
      // любое положительное значение + удалит пробелы по краям
      tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
    };
    setLoading(true);

    try {
      apiService

        .postCreateArticle(newArticle, JSON.parse(localStorage.getItem('token')))
        .then((res) => {
          if (res.article) {
            setLoading(false);
            setSuccessAlert(true);
            setIsError(false);
          }

          if (res.errors) {
            setLoading(false);
            setIsError(true);
            const errorStr = `${res.errors.error.status} ${res.errors.message}`;
            setErrorText(errorStr);
          }
        })
        .catch(() => {
          setLoading(false);
          setIsError(true);
          setErrorText('Data loading error. Please try reloading the page or try again later.');
        });
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  // при закрытии сообщения об успехе или ошибке
  const atCloseAletr = () => {
    setSuccessAlert(false);
    setIsError(false);
  };

  const form =
    !isLoading && !isError && !isSuccessAlert ? (
      <FormArticle transferData={createArticle} title="Create new article" />
    ) : null;

  const loader = isLoading && !isError ? <Loader /> : null;

  const errorAlert = isError ? <ErrorMessage description={errorText} closingAlert={atCloseAletr} /> : null;

  const successAlert = isSuccessAlert ? (
    <SuccessMessage description="Article created successfully!" closingAlert={atCloseAletr} closable />
  ) : null;

  return (
    <>
      {successAlert}
      {errorAlert}
      {form}
      {loader}
    </>
  );
});

export { CreateArticle };
