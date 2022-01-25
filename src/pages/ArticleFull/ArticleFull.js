import React, { useState, useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Article } from '../../components/Article';
import { ErrorMessage } from '../../components/ErrorMessage';
import { SuccessMessage } from '../../components/SuccessMessage';
import { Loader } from '../../components/Loader';
import { apiService } from '../../services/apiService';

const ArticleFull = memo(() => {
  const { slug } = useParams(); // получает slug из роутера
  const [item, setItem] = useState({}); // отображаемый элемент
  const [isLoading, setLoading] = useState(true); // отображение лоадера
  const [isError, setIsError] = useState(false); // отобажение ошибки
  const [errorText, setErrorText] = useState(''); // текст ошибки
  const [isSuccess, setIsSuccess] = useState(false); // отобажение успех запроса
  const [controllerShow, setControllerShow] = useState(false);

  const stateUser = useSelector((state) => state.user);
  const { userData } = stateUser;

  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

  useEffect(() => {
    // получает статью по slug
    apiService
      .getAarticleFull(slug, token)
      .then((res) => {
        // показывает контроллер если пользователь залогинен и username в стор сопадает с автором статьи
        if (userData && userData.username === res.article.author.username) {
          setControllerShow(true);
        }

        setItem(res.article);
        setLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setErrorText('Data loading error. Please try reloading the page or try again later.');
        setLoading(false);
      });
  }, [slug, isLoading, userData, token]);

  const onCloseMessage = () => {
    setIsError(false);
    setErrorText('');
    setLoading(false);
  };

  // подтвердить удаление
  const confirmDeletion = () => {
    // удаляет статью
    apiService.deleteArticle(slug, token).then((res) => {
      // если первый символ статуса 2 (OK)
      if (String(res.status)[0] === '2') {
        setIsSuccess(true);
      } else {
        // если нет ошибка
        setErrorText(`error: ${res.status} ${res.statusText}`); // текст ошибки
        setIsError(true); // флаг ошибки
      }
    });
  };

  // отображает индикатор загрузки пока не получена статья
  const loading = isLoading && !isError ? <Loader /> : null;

  // отображает статью если объект не пустой (статья получена)
  const article =
    Object.keys(item).length !== 0 && !isSuccess ? (
      <Article item={item} controllerFlag={controllerShow} confirmDeletion={confirmDeletion} />
    ) : null;

  // соообщение об ошибке
  const errorMasege = isError ? <ErrorMessage description={errorText} closingAlert={onCloseMessage} /> : null;

  // собщение об успехе
  const successMasege =
    isSuccess && !isError ? (
      <SuccessMessage description="Article successfully removed!" closingAlert={onCloseMessage} closable={false} />
    ) : null;

  return (
    <>
      {errorMasege}
      {successMasege}
      {loading}
      {article}
    </>
  );
});

export { ArticleFull };
