/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../Layout';
import ArticlesList from '../ArticlesList';
import ArticleFull from '../ArticleFull';

const App = function () {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="articles" element={<ArticlesList />} />
        <Route path="/articles/:slug" element={<ArticleFull />} />
      </Route>
    </Routes>
  );
};

export default App;
