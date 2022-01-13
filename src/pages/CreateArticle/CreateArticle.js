/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';

import FormArticle from '../../components/FormArticle';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

import apiService from '../../services/ApiService';

const CreateArticle = () => {
  const [isLoading, setLoading] = useState(false); // отображение лоадера
  const [isError, setIsError] = useState(false); // отобажение ошибки
  const [errorMessade, setErrorMessade] = useState(''); // текст ошибки
  const [isSuccess, setSuccess] = useState(false); // отображение лоадера

  // создает стаью используя токен из хранилища
  const createArticle = (val) => {
    // console.log(val)
    const newArticle = {
      title: val.title.trim(),
      description: val.description.trim(),
      body: val.body,
      tagList: val.tagList.filter((el) => el).map((el) => el.trim()), // любое положительное значение + удалит пробелы по краям
    };
    // console.log(newArticle)

    setLoading(true);

    apiService
      .postCreateArticle(newArticle, JSON.parse(localStorage.getItem('token')))
      .then((res) => {
        if (res.article) {
          setLoading(false);
          setSuccess(true);
        } else {
          setLoading(false);
          setIsError(true);
          setErrorMessade(res);
        }
      })
      .catch((err) => {
        // console.log(err)
        setLoading(false);
        setIsError(true);
        setErrorMessade('Data loading error. Please try reloading the page or try again later.');
      });
  };

  // при закрытии сообщения об успехе или ошибке
  const atCloseAletr = () => {
    setSuccess(false);
    setIsError(false);
  };

  const form = !isLoading && !isError && !isSuccess ? <FormArticle callback={createArticle} /> : null;

  const loader = isLoading && !isError ? <Loader /> : null;

  const errorMasege = isError ? <ErrorMessage description={errorMessade} callback={atCloseAletr} /> : null;

  const successAlert = isSuccess ? <SuccessMessage description="SuccessMessage" callback={atCloseAletr} /> : null;

  return (
    <React.Fragment>
      {successAlert}
      {errorMasege}
      {form}
      {loader}
    </React.Fragment>
  );
};

export default CreateArticle;
