import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';

export default configureStore({
  reducer: {
    user: userReduser,
  },
});
