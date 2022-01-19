/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable id-length */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseStr = `https://kata.academy:8021/api`;
// const baseStr = `http://api.realworld.io/api`;
// const baseStr = `https://cirosantilli-realworld-next.herokuapp.com/api`;

// регитрация пользователя
export const fetchUserRegistration = createAsyncThunk(
  'user/fetchUserRegistration',
  async function (newUser, { rejectWithValue }) {
    const url = new URL(`${baseStr}/users`);

    const body = {
      user: newUser,
    };
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    }).catch((e) => {
      console.log(e);
      return rejectWithValue(e.message);
    });

    return response.json();
  }
);

// авторизация пользователя
export const fetchUserLogIn = createAsyncThunk('user/fetchUserLogIn', async function (newUser, { rejectWithValue }) {
  const url = new URL(`${baseStr}/users/login`);
  const body = {
    user: newUser,
  };
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
  };
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: headers,
  }).catch((e) => {
    console.log(e);
    return rejectWithValue(e.message);
  });

  return response.json();
});

// обновление данных пользователя
export const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async function ({ newUser, token }, { rejectWithValue }) {
    const url = new URL(`${baseStr}/user`);
    const body = {
      user: newUser,
    };
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }).catch((e) => rejectWithValue(e.message));

    return response.json();
  }
);

// сохранение пользователя зарегистрирванного в системе
export const fetchUserSave = createAsyncThunk('user/fetchUserSave', async function (token, { rejectWithValue }) {
  const url = new URL(`${baseStr}/user`);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).catch((e) => {
    console.log(e);
    return rejectWithValue(e.message);
  });

  return response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    status: null,
    error: null,
  },

  reducers: {
    // разлогинивание пользователя
    logOutUser(state, action) {
      state.userData = null;
      state.status = null;
      state.error = null;
    },

    // разлогинивание пользователя
    errorNull(state, action) {
      state.error = null;
    },
  },

  extraReducers: {
    // fetchUserRegistration
    [fetchUserRegistration.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUserRegistration.fulfilled]: (state, action) => {
      // если получен user
      if (action.payload.user) {
        state.status = 'resolved';
        // записывает юзера в стор
        state.userData = action.payload.user;
        return;
      }
      // если получены ошибки
      if (action.payload.errors) {
        // создает строку ошибки
        let errStr = '';

        // обрабатывает ошибку 404
        if (action.payload.errors.error) {
          errStr += action.payload.errors.error.status;
        } else {
          // возвращает массив ошибок из тела errors
          const errArr = Object.entries(action.payload.errors);
          // накапливает сообщения об ошибках в строку ошибки
          errArr.forEach((item) => {
            errStr += `${item[0]}: ${item[1]} `;
          });
        }
        // записывает сроку ошибки в стор
        state.error = errStr;
      }
    },
    [fetchUserRegistration.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = 'error';
    },

    // fetchUserLogIn
    [fetchUserLogIn.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUserLogIn.fulfilled]: (state, action) => {
      // если получен user
      if (action.payload.user) {
        state.status = 'resolved';
        state.userData = action.payload.user;
        return;
      }
      // если получены ошибки
      if (action.payload.errors) {
        state.status = 'rejected';

        // создает строку ошибки
        let errStr = '';

        // обрабатывает ошибку 404
        if (action.payload.errors.error) {
          errStr += action.payload.errors.error.status;
        } else {
          // возвращает строку с ошибкой из тела errors
          const errArr = Object.entries(action.payload.errors);
          errStr = `${errArr[0][0]}: ${errArr[0][1]}`;
        }
        state.error = errStr;
      }
    },
    [fetchUserLogIn.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    // fetchUserSave
    [fetchUserSave.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUserSave.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.userData = action.payload.user;
    },
    [fetchUserSave.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    // fetchUserUpdate
    [fetchUserUpdate.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUserUpdate.fulfilled]: (state, action) => {
      // если получен user
      if (action.payload.user) {
        state.status = 'resolved';
        // записывает юзера в стор
        state.userData = action.payload.user;
        return;
      }
      // если получены ошибки
      if (action.payload.errors) {
        state.status = 'rejected';

        // создает строку ошибки
        let errStr = '';

        // обрабатывает ошибку 404
        if (action.payload.errors.error) {
          errStr += action.payload.errors.error.status;
        } else {
          // возвращает массив ошибок из тела errors
          const errArr = Object.entries(action.payload.errors);
          // накапливает сообщения об ошибках в строку ошибки
          errArr.forEach((item) => {
            errStr += `${item[0]}: ${item[1]} `;
          });
        }
        // записывает сроку ошибки в стор
        state.error = errStr;
      }
    },
    [fetchUserUpdate.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { logOutUser, errorNull } = userSlice.actions;

export default userSlice.reducer;
