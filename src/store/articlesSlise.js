/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseStr = `https://kata.academy:8021/api`;

export const fetchGetArticlesByPageNum = createAsyncThunk(
  'articles/fetchGetArticlesByPageNum',
  async ([pageNum, token], { rejectWithValue }) => {
    const url = new URL(`${baseStr}/articles`);
    url.searchParams.set('limit', 5);
    url.searchParams.set('offset', pageNum);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server error ${response.status}!`);
      }

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articlesSlise = createSlice({
  name: 'articles',
  initialState: {
    list: [],
    activePage: 1,
    maxPages: null,
    status: null,
    error: null,
  },

  reducers: {
    // реагирует на измененние страницы пагинации
    paginationPageChange(state, action) {
      state.activePage = action.payload;
    },
  },

  extraReducers: {
    [fetchGetArticlesByPageNum.pending]: (state) => {
      state.list = [];
      state.status = 'loading';
      state.error = null;
    },

    [fetchGetArticlesByPageNum.fulfilled]: (state, action) => {
        state.status = 'resolved';
        state.error = null;

        // записывет в стейт список статей
        state.list = action.payload.articles;
        // считает максимальное кол-во страниц
        state.maxPages = Math.ceil(action.payload.articlesCount / 5);
    },

    [fetchGetArticlesByPageNum.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { paginationPageChange } = articlesSlise.actions;

export default articlesSlise.reducer;
