/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from 'antd';
import { paginationPageChange, fetchGetArticlesByPageNum } from '../../store/articlesSlise';
import { useStateArticles } from '../../selectors';
import 'antd/dist/antd.css';
import styles from './ArticlesList.module.scss';
import { ArticlPreview } from '../../components/ArticlPreview';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';

const ArticlesList = memo(() => {
  const dispath = useDispatch();

  // получает данные о статьях из стора
  const { maxPages, activePage, list, status, error } = useStateArticles();

  const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : '';

  useEffect(() => {
    // получает список статей по номеру страницы
    dispath(fetchGetArticlesByPageNum([(activePage - 1) * 5, token]));
  }, [activePage]);

  const onChangePage = (pageNum) => {
    // передает в стор норер актоивной страницы
    dispath(paginationPageChange(pageNum));
  };

  const articlesList = list && (
    <ul className={styles['articles-list']}>
      {list.map((el) => (
        <li key={el.slug}>
          <ArticlPreview item={el} controllerFlag={false} />
        </li>
      ))}
    </ul>
  );

  const loading = status === 'loading' && <Loader />;

  const errorMasege = error && <ErrorMessage description={error} type="error" />;

  const pagination = list && (
    <Pagination
      className={styles['ant-pagination']}
      showQuickJumper
      showSizeChanger={false}
      current={activePage}
      total={maxPages * 10}
      onChange={onChangePage}
    />
  );

  return (
    <>
      {loading}
      {errorMasege}
      {articlesList}
      {pagination}
    </>
  );
});

export { ArticlesList };
