/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, memo } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import styles from './ArticlesList.module.scss';
import { ArticlPreview } from '../../components/ArticlPreview';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { apiService } from '../../services/apiService';

const ArticlesList = memo(() => {
  const [list, setList] = useState([]); // список статей

  const [isLoading, setLoading] = useState(true); // отображение лоадера
  const [isError, setIsError] = useState(false); // отобажение ошибки

  const savedPage = JSON.parse(localStorage.getItem('savedPage')) ? JSON.parse(localStorage.getItem('savedPage')) : 1; // сохраненная страница из хранилища
  const [page, setPage] = useState(savedPage); // текущая страница
  const [maxPagesNum, setMaxPagesNum] = useState(0); // считает максимальное число страниц

  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('savedPage'))) {
      setPage(savedPage);
    }
    getMaxPages(); // получает максимальное кол-во статей для рассчета пагинации
    getList(); // получаетс список статей для рендера
  }, []);

  // вычисляет сколько максимум отобразить страниц
  const getMaxPages = () => {
    apiService
      .getArticlesMax(token)
      .then((res) => {
        // console.log
        setMaxPagesNum(Math.ceil(res.articlesCount / 5));
        setIsError(false);
      })
      .catch(() => {
        showError();
      });
  };

  // получает список
  const getList = () => {
    apiService
      // .getArticles(token)
      .getArticlesByPageNum((page - 1) * 5, token)
      .then((res) => {
        setList(res.articles);
        setLoading(false);
        setIsError(false);
      })
      .catch(() => {
        showError();
      });
  };

  // запрашивает новый список статей по изменению страницы пагинации
  const onChangePage = (value) => {
    try {
      localStorage.setItem('savedPage', JSON.stringify(value));

      setPage(value);
      setList({});
      setLoading(true);
      setIsError(false);

      apiService
        .getArticlesByPageNum((value - 1) * 5, token) // сдвигает кол-во страниц на 5
        .then((res) => {
          // console.log(res);
          setList(res.articles);
          setLoading(false);
          setIsError(false);
        })
        .catch(() => {
          showError();
        });
    } catch (e) {
      console.log(e);
    }
  };

  const showError = () => {
    setIsError(true);
    setList({});
    setLoading(false);
  };

  // отображает список статей если он не пустой
  const newList =
    list.length && !isError ? (
      <ul className={styles['articles-list']}>
        {list.map((el) => (
          <li key={el.slug}>
            <ArticlPreview item={el} controllerFlag={false} />
          </li>
        ))}
      </ul>
    ) : null;

  // ошибка
  const errorMasege = isError ? (
    <ErrorMessage description="Data loading error. Please try reloading the page or try again later." type="error" />
  ) : null;

  // отображает пагинацию если список статей не пустой
  const pagination =
    list.length && !isError ? (
      <Pagination
        className={styles['ant-pagination']}
        showQuickJumper
        showSizeChanger={false}
        current={page}
        total={maxPagesNum * 10}
        onChange={onChangePage}
      />
    ) : null;

  // отображает индикатор заглушки
  const loading = isLoading ? <Loader /> : null;

  return (
    <>
      {newList}
      {pagination}
      {loading}
      {errorMasege}
    </>
  );
});

export { ArticlesList };
