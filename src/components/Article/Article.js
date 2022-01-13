/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-children-prop */
/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */

import React from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import ArticlPreview from '../ArticlPreview';

import styles from './Article.module.scss';

const Article = ({ item, controllerFlag }) => {
  return (
    <article className={styles['article']}>
      <ArticlPreview item={item} controllerFlag={controllerFlag} />
      <div className={styles['article__body']}>
        <ReactMarkdown children={item.body} remarkPlugins={[remarkGfm]} />
      </div>
    </article>
  );
};

export default Article;
