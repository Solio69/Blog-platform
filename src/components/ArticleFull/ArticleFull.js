/* eslint-disable no-undef */
/* eslint-disable react/jsx-fragments */
/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
/* eslint-disable dot-notation */
/* eslint-disable react/no-array-index-key */
/* eslint-disable arrow-body-style */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */

import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import styles from './ArticleFull.module.scss';

import Article from '../Article';

import apiServise from '../../services/ApiService';

const ArticleFull = function () {
  const { slug } = useParams();
  const [item, setItem] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    apiServise.getAarticleFull(slug).then((res) => {
      setItem(res.article);
      setLoading(false);
    });
  }, [slug]);

  // отображает индикатор загрузки пока не получена статья
  const loading = isLoading ? <Spin className={styles['ant-spin']} size="large" /> : null;
  
  // отображает статью если объект не пустой (статья получена)
  const article = Object.keys(item).length !== 0 ? <Article item={item} /> : null;

  return (
    <React.Fragment>
      {loading}
      {article}
    </React.Fragment>
  );
};

export default ArticleFull;
