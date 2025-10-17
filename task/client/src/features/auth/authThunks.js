import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, refreshToken, logoutUser } from './authApi';

export const registerUserThunk = createAsyncThunk('auth/registerUser', async (data, { rejectWithValue }) => {
  try {
    const res = await registerUser(data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

export const loginUserThunk = createAsyncThunk('auth/loginUser', async (data, { rejectWithValue }) => {
  try {
    const res = await loginUser(data);
    return { user: res.data.user, accessToken: res.data.accessToken };
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const refreshTokenThunk = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
  try {
    const res = await refreshToken();
    return res.data;
  } catch (err) {
    return rejectWithValue('Refresh failed', err.message);
  }
});

export const logoutUserThunk = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const res = await logoutUser();
    return res.data;
  } catch (err) {
    return rejectWithValue('Logout failed', err.message);
  }
});
