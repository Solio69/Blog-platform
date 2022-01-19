/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUserSave } from '../../store/userSlice';

import Layout from '../../pages/Layout';
import ArticlesList from '../../pages/ArticlesList';
import ArticleFull from '../../pages/ArticleFull';
import SignIn from '../../pages/SignIn';
import SignUP from '../../pages/SignUP';
import Profile from '../../pages/Profile';
import CreateArticle from '../../pages/CreateArticle';
import ArticleEdit from '../../pages/ArticleEdit';

const App = function () {
  const dispath = useDispatch();

  useEffect(() => {
    // если токен есть то получаем данные пользователя с его использованием
    if (JSON.parse(localStorage.getItem('token'))) {
      // console.log('token:', JSON.parse(localStorage.getItem('token')))
      dispath(fetchUserSave(JSON.parse(localStorage.getItem('token'))));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticleFull />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUP />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:slug/edit" element={<ArticleEdit />} />
      </Route>
    </Routes>
  );
};

export default App;
