import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserSave } from '../../store/userSlice';
import { Layout } from '../../pages/Layout';
import { ArticlesList } from '../../pages/ArticlesList';
import { ArticleFull } from '../../pages/ArticleFull';
import { SignIn } from '../../pages/SignIn';
import { SignUP } from '../../pages/SignUP';
import { Profile } from '../../pages/Profile';
import { CreateArticle } from '../../pages/CreateArticle';
import { ArticleEdit } from '../../pages/ArticleEdit';
import { RequireAuth } from '../../HOC/RequireAuth';

const App = () => {
  const dispath = useDispatch();

  useEffect(() => {
    try {
      // если токен есть то получаем данные пользователя с его использованием
      if (JSON.parse(localStorage.getItem('token'))) {
        dispath(fetchUserSave(JSON.parse(localStorage.getItem('token'))));
      }
    } catch (e) {
      console.log(e);
    }
  }, [dispath]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticleFull />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUP />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <CreateArticle />
            </RequireAuth>
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            <RequireAuth>
              <ArticleEdit />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export { App };
