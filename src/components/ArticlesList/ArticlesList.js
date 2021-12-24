/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-array-index-key */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';

import { Pagination, Spin } from 'antd';

import 'antd/dist/antd.css';

import styles from './ArticlesList.module.scss';
import ArticlPreview from '../ArticlPreview';
import apiServise from '../../services/ApiService';

const ArticlesList = function () {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  // получает список статей на стадии монтирования
  useEffect(() => {
    apiServise.getArticles().then((res) => {
      setList(res.articles);
      setLoading(false);
    });
  }, []);
  // console.log(list);

  // запрашивает статьи по клику на страницу пагинации
  const onChangePage = (value) => {
    setPage(value)
    setList({})
    setLoading(true);
    
    apiServise.getArticlesByPageNum(value - 1).then((res) => {
      setList(res.articles);
      setLoading(false);
    });
  };

  // отображает список статей если он не пустой
  const newList = list.length ? (
    <ul className={styles['articles-list']}>
      {list.map((el, i) => {
        return (
          <li>
            <ArticlPreview item={el} key={el.slug} />
          </li>
        );
      })}
    </ul>
  ) : null;

  // отображает пагинацию если список статей не пустой 
  const pagination = list.length ? (
    <Pagination
        className={styles['ant-pagination']}
        size="small"
        defaultCurrent={page}
        total={50}
        onChange={onChangePage}
      />
  ) : null;
 
  // отображает индикатор заглушки
  const loading = isLoading ? <Spin className={styles['ant-spin']} size="large" /> : null;

  return (
    <React.Fragment>
      {newList}
      {pagination}
      {loading}
    </React.Fragment>
  );
};

export default ArticlesList;
