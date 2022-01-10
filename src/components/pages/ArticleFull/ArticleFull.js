/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-fragments */

import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import styles from './ArticleFull.module.scss';

import Article from '../../Article';
import ErrorMessage from '../../ErrorMessage';

import apiService from '../../../services/ApiService';

const ArticleFull = function () {
  const { slug } = useParams(); // получает slug из роутера
  const [item, setItem] = useState({}); // отображаемый элемент
  const [isLoading, setLoading] = useState(true); // отображение лоадера
  const [isError, setIsError] = useState(false); // отобажение ошибки

  useEffect(() => {
    // получает статью по slug
    apiService
      .getAarticleFull(slug)
      .then((newItem) => {
        setItem(newItem); // изменяет item
        setLoading(false); // отклюает лоадер
        setIsError(false);
        // console.log('useEffect')
      })
      .catch(() => {
        setIsError(true);
      });
  }, [slug, isLoading, isError]);

  // отображает индикатор загрузки пока не получена статья
  const loading = isLoading && !isError ? <Spin className={styles['ant-spin']} size="large" /> : null;

  // отображает статью если объект не пустой (статья получена)
  const article = Object.keys(item).length !== 0 ? <Article item={item} /> : null;

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
