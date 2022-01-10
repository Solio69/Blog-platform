/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import React from 'react';
import { Link } from 'react-router-dom';
import { formCreateDate } from '../../utils/index';

import styles from './ArticlPreview.module.scss';

import ilkeIconEmpty from '../../images/like-empty-icon.png';

import avatarIcon from '../../images/avatar-icon.png';

const ArticlPreview = function ({ item }) {
  // console.log(item);
  const { title, favoritesCount, tagList, author, description, createdAt, slug } = item;
  const { username: authorName, image: authorAvatar } = author;

  // строка с датой создания
  const createDate = formCreateDate(createdAt);

  // вернет аватар если он будет, если нет, то заглушку
  const avatar = authorAvatar === 'null' ? avatarIcon : authorAvatar;

  // вернет список тегов
  const tags = tagList.map((el, i) => {
    if (el.length) {
      return <li key={i}>{el}</li>;
    }
  });

  // динамичекий параметр передаваемый в роутер
  const paramSlug = `/articles/${slug}`;

  return (
    <div className={styles['article-preview']}>
      <div className={styles['article-preview__header']}>
        <div>
          <div className={styles['article-preview__title-wrapper']}>
            <Link to={paramSlug} className={styles['article-preview__article-title']}>
              {title}
            </Link>
            <div className={styles['article-preview__article-likes']}>
              <button type="button" className={styles['article-preview__button-likes']}>
                <img src={ilkeIconEmpty} alt="ilke-icon" />
              </button>

              <span className={styles['article-preview__likes-count']}>{favoritesCount}</span>
            </div>
          </div>
          <ul className={styles['article-preview__tags-list']}>{tags}</ul>
        </div>
        <div className={styles['article-preview__author']}>
          <div className={styles['article-preview__author-wrapper']}>
            <span className={styles['article-preview__author-name']}>{authorName}</span>
            <span className={styles['article-preview__publication-date']}>{createDate}</span>
          </div>
          <img src={avatar} alt="avatar" className={styles['article-preview__author-avatar']} />
        </div>
      </div>
      <div className={styles['article-preview__content']}>
        <p className={styles['article-preview__text']}>{description}</p>
      </div>
    </div>
  );
};

export default ArticlPreview;
