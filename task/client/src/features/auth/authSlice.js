import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, registerUserThunk, refreshTokenThunk, logoutUserThunk } from './authThunks';

const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('token');

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // login/register
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.accessToken);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
        state.loading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.payload || 'Registration failed';
        state.loading = false;
      })
      // refresh token
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        localStorage.setItem('token', action.payload.accessToken);
      })
      // logout
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.clear();
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
