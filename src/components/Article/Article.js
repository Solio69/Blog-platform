/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-children-prop */
/* eslint-disable dot-notation */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArticlPreview from '../ArticlPreview';
import styles from './Article.module.scss';

const Article = ({ item }) => {
  // console.log(item)
  const markdown = `
  
  ## Overview

  * Follows [CommonMark](https://commonmark.org)
  * Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
  * Renders actual React elements instead of using 
  * Lets you define your own components 
  * Has a lot of plugins
  `;

  return (
    <article className={styles['article']}>
      <ArticlPreview item={item} />
      <div className={styles['article__body']}>
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
      </div>
    </article>
  );
};

export default Article;
