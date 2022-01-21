
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types'; 

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import formCreateDate from '../../utils/index';

import styles from './ArticlPreview.module.scss';

import likeIconEmpty from '../../images/like-empty-icon.png';
import likeIconFill from '../../images/like-fill-icon.png.png';
import avatarIcon from '../../images/avatar-icon.png';

import apiService from '../../services/ApiService';

import ArticleControler from '../ArticleControler';

const ArticlPreview = function ({ item, controllerFlag, confirmDeletion }) {
  const { title, favorited, favoritesCount, tagList, author, description, createdAt, slug } = item;
  const { username: authorName, image: authorAvatar } = author;

  // строка с датой создания
  const createDate = formCreateDate(createdAt);

  // вернет аватар если он будет, если нет, то заглушку
  const avatar = authorAvatar === 'null' ? avatarIcon : authorAvatar;

  // вернет список тегов
  // eslint-disable-next-line react/no-array-index-key
  const tags = tagList.map((el, i) => (el.length ? <li key={i}>{el}</li> : null));

  // динамичекий параметр передаваемый в роутер
  const paramSlug = `/articles/${slug}`;

  // переменные для работы с лайками
  const [like, setLike] = useState(favorited);
  const [likeIcon, setLikeIcon] = useState(likeIconEmpty);
  const [likeCount, setLikeCount] = useState(favoritesCount);
  const [isLikeDsabled, setLikeDsabled] = useState(true);

  // данные пользователя из стор
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // если есть лайк меняет иконку
    if (favorited) {
      setLike(true);
      setLikeIcon(likeIconFill);
    }

    // если пользователь авторизован
    if (userData) {
      // то кнопка лайка разблокирована
      setLikeDsabled(false);
    }
  }, [userData, favorited]);

  const onlikeClick = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    // если лайк не стоит
    if (!like) {
      // добавляет в избранное
      apiService.postAddFavorites(slug, token).then((res) => {
        // при получении корректного ответа сервера изменяет иконку и счетчик
        if (res.article.favorited) {
          setLike(true);
          setLikeIcon(likeIconFill);
          setLikeCount(res.article.favoritesCount);
        }
      });
    }
    // если лайк стоит
    else {
      // то удаляет из избранного
      apiService.deleteFavorites(slug, token).then((res) => {
        // при получении корректного ответа сервера изменяет иконку и счетчик
        if (!res.article.favorited) {
          setLike(false);
          setLikeIcon(likeIconEmpty);
          setLikeCount(res.article.favoritesCount);
        }
      });
    }
  };

  return (
    <div className={styles['article-preview']}>
      <div className={styles['article-preview__header']}>
        <div>
          <div className={styles['article-preview__title-wrapper']}>
            <Link to={paramSlug} className={styles['article-preview__article-title']}>
              {title}
            </Link>
            <div className={styles['article-preview__article-likes']}>
              <button
                type="button"
                className={styles['article-preview__button-likes']}
                onClick={onlikeClick}
                disabled={isLikeDsabled}
              >
                <img src={likeIcon} alt="ilke-icon" />
              </button>
              <span className={styles['article-preview__likes-count']}>{likeCount}</span>
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
        <ArticleControler controllerFlag={controllerFlag} confirmDeletion={confirmDeletion} />
      </div>
    </div>
  );
};


ArticlPreview.defaultProps = {
  controllerFlag:false,
  item:{
    title: '', 
    favorited:false, 
    favoritesCount:null, 
    tagList:[], 
    author:PropTypes.shape({
      username: '', 
      image: null
    }), 
    description:'', 
    createdAt:'', 
    slug:'', 
  }
};

ArticlPreview.propTypes = {
  item:PropTypes.shape({
    title: PropTypes.string, 
    favorited:PropTypes.bool, 
    favoritesCount:PropTypes.number, 
    tagList:PropTypes.shape([]), 
    author:PropTypes.shape({
      username: PropTypes.string, 
      image: PropTypes.string
    }), 
    description:PropTypes.string, 
    createdAt:PropTypes.string, 
    slug:PropTypes.string, 
  }),
  controllerFlag:PropTypes.bool,
  confirmDeletion:PropTypes.func.isRequired,
};

export default ArticlPreview;
