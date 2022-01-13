/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-fragments */

import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Article from '../../components/Article';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';

import apiService from '../../services/ApiService';

const ArticleFull = function () {
  const { slug } = useParams(); // получает slug из роутера
  const [item, setItem] = useState({}); // отображаемый элемент
  const [isLoading, setLoading] = useState(true); // отображение лоадера
  const [isError, setIsError] = useState(false); // отобажение ошибки
  const [controllerShow, setControllerShow] = useState(false);

  const { userData } = useSelector((state) => state.user);
  // console.log(userData.username)

  useEffect(() => {
    // получает статью по slug
    apiService
      .getAarticleFull(slug)
      .then((newItem) => {
        // console.log(newItem)
        if (userData.username === newItem.author.username) {
          setControllerShow(true);
        }
        // console.log(newItem.author.username)
        setItem(newItem); // изменяет item
        setLoading(false); // отклюает лоадер
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      });

    // console.log('useEffect');
  }, [slug, isLoading, isError, userData]);

  // отображает индикатор загрузки пока не получена статья
  const loading = isLoading && !isError ? <Loader /> : null;

  // отображает статью если объект не пустой (статья получена)
  const article = Object.keys(item).length !== 0 ? <Article item={item} controllerFlag={controllerShow} /> : null;

  const errorMasege = isError ? (
    <ErrorMessage description="Data loading error. Please try reloading the page or try again later." />
  ) : null;

  return (
    <React.Fragment>
      {loading}
      {article}
      {errorMasege}
    </React.Fragment>
  );
};

export default ArticleFull;
