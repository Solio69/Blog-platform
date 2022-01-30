import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import articlesReduser from './articlesSlise';

export default configureStore({
  reducer: {
    user: userReduser,
    articles: articlesReduser,
  },
});
