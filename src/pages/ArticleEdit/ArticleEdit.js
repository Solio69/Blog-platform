/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable react/function-component-definition */

import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import FormArticle from '../../components/FormArticle';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import Loader from '../../components/Loader';

import apiService from '../../services/ApiService';

// import styles from './ArticleEdit.module.scss';

const ArticleEdit = () => {
  const { slug } = useParams(); // получает slug из роутера

  const [articleTitle, setArticleTitle] = useState('');
  const [description, setDescription] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [tagList, setTagList] = useState([]);

  const [isLoading, setLoading] = useState(false); // отображение лоадера
  const [isError, setIsError] = useState(false); // отобажение ошибки
  const [errorText, setErrorText] = useState(''); // текст ошибки
  const [isSuccessAlert, setSuccessAlert] = useState(false); // отображение лоадера

  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

  useEffect(() => {
    updateFormData();
  }, []);

  // обновляет данные в полях формы
  const updateFormData = () => {
    apiService.getAarticleFull(slug, token).then((res) => {
      setTagList(res.article.tagList);
      setDescription(res.article.description);
      setArticleTitle(res.article.title);
      setArticleBody(res.article.body);
    });
  };

  // обновляет статью
  const articleUpdate = (val) => {
    const modifiedArticle = {
      title: val.title.trim(),
      description: val.description.trim(),
      body: val.body,
      // любое положительное значение + удалит пробелы по краям
      tagList: val.tagList.map((el) => el.trim()).filter((el) => el && el !== ''),
    };

    setLoading(true);

    apiService
      .putArticleUpdate(slug, modifiedArticle, JSON.parse(localStorage.getItem('token')))
      .then((res) => {
        if (res.article) {
          setLoading(false);
          setSuccessAlert(true);

          updateFormData(); // обновляет данные в форме
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
  };

  // при закрытии сообщения об успехе или ошибке
  const atCloseAletr = () => {
    setSuccessAlert(false);
    setIsError(false);
  };

  const form =
    !isLoading && !isError && !isSuccessAlert ? (
      <FormArticle
        title="Edit article"
        tagList={tagList}
        description={description}
        articleTitle={articleTitle}
        articleBody={articleBody}
        callback={articleUpdate}
      />
    ) : null;

  const loader = isLoading ? <Loader /> : null;

  const errorAlert = isError ? <ErrorMessage description={errorText} callback={atCloseAletr} /> : null;

  const successAlert = isSuccessAlert ? (
    <SuccessMessage description="Article update successfully!" callback={atCloseAletr} closable={true} />
  ) : null;

  return (
    <React.Fragment>
      {successAlert}
      {errorAlert}
      {form}
      {loader}
    </React.Fragment>
  );
};

export default ArticleEdit;
