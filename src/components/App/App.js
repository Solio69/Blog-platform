/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUserSave } from '../../store/userSlice';

import Layout from '../pages/Layout';
import ArticlesList from '../pages/ArticlesList';
import ArticleFull from '../pages/ArticleFull';
import FormSignIn from '../FormSignIn';
import FormSignUP from '../FormSignUP';
import EditProfile from '../pages/EditProfile';

const App = function () {
  const dispath = useDispatch();
  // const { error, status, userData } = useSelector((state) => state.user);

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
        <Route path="/sign-in" element={<FormSignIn />} />
        <Route path="/sign-up" element={<FormSignUP />} />
        <Route path="/profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
