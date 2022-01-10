/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable id-length */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const baseStr  = `http://kata.academy:8022`;
// const baseStr = `http://api.realworld.io/api`;
const baseStr = `https://cirosantilli-realworld-next.herokuapp.com/api`;

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
    }).catch((e) => rejectWithValue(e.message));

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
  }).catch((e) => rejectWithValue(e.message));

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
  }).catch((e) => rejectWithValue(e.message));

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
        state.userData = action.payload.user;
        return;
      }
      // если получены ошибки
      if (action.payload.errors) {
        state.status = 'resolved';

        // возвращает строку с ошибкой из тела errors
        const errArr = Object.entries(action.payload.errors);
        state.error = `${errArr[0][1]}`;
      } else {
        state.status = 'rejected';
        state.error = action.payload; // сюда попадет строка ошибки если запрос выполнится некорректно (404)
      }
    },
    [fetchUserRegistration.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
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
        state.status = 'resolved';

        // возвращает строку с ошибкой из тела errors
        const errArr = Object.entries(action.payload.errors);
        state.error = `${errArr[0][0]}: ${errArr[0][1]}`;
      } else {
        state.status = 'rejected';
        state.error = action.payload; // сюда попадет строка ошибки если запрос выполнится некорректно (404)
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
        state.userData = action.payload.user;
        return;
      }
      // если получены ошибки
      if (action.payload.errors) {
        state.status = 'resolved';

        // возвращает строку с ошибкой из тела errors
        const errArr = Object.entries(action.payload.errors);
        state.error = `${errArr[0][1]}`;
      } else {
        state.status = 'rejected';
        state.error = action.payload; // сюда попадет строка ошибки если запрос выполнится некорректно (404)
      }
    },
    [fetchUserUpdate.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { logOutUser } = userSlice.actions;

export default userSlice.reducer;
