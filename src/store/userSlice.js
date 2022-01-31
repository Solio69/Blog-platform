/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow-callback */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseStr = `https://kata.academy:8021/api`;

// регитрация пользователя
export const fetchUserRegistration = createAsyncThunk(
  'user/fetchUserRegistration',
  async function (newUser, { rejectWithValue }) {
    const url = new URL(`${baseStr}/users`);
    try {
      const body = {
        user: newUser,
      };
      const headers = {
        'Content-Type': 'application/json;charset=utf-8',
      };
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      });

      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// авторизация пользователя
export const fetchUserLogIn = createAsyncThunk('user/fetchUserLogIn', async function (newUser, { rejectWithValue }) {
  const url = new URL(`${baseStr}/users/login`);
  try {
    const body = {
      user: newUser,
    };
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    return response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// обновление данных пользователя
export const fetchUserUpdate = createAsyncThunk(
  'user/fetchUserUpdate',
  async function ({ newUser, token }, { rejectWithValue }) {
    const url = new URL(`${baseStr}/user`);
    try {
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
    })

    return response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
  }
);

// сохранение пользователя зарегистрирванного в системе
export const fetchUserSave = createAsyncThunk('user/fetchUserSave', async function (token, { rejectWithValue }) {
  const url = new URL(`${baseStr}/user`);
  try {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })

  return response.json();
  
} catch (error) {
  return rejectWithValue(error.message);
}
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
    logOutUser(state) {
      state.userData = null;
      state.status = null;
      state.error = null;
    },

    // обнуление ошибки
    errorNull(state) {
      state.error = null;
    },
  },

  extraReducers: {
    // fetchUserRegistration
    [fetchUserRegistration.pending]: (state) => {
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
    [fetchUserRegistration.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    // fetchUserLogIn
    [fetchUserLogIn.pending]: (state) => {
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
    [fetchUserSave.pending]: (state) => {
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
    [fetchUserUpdate.pending]: (state) => {
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
