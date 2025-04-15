import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://185.198.166.5:3000/';
const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}auth/login`,
  REGISTER: `${BASE_URL}auth/register`,
  REFRESH: `${BASE_URL}auth/refresh`,
  LOGOUT: `${BASE_URL}auth/logout`,
};

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_ENDPOINTS.REGISTER, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Registration error'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_ENDPOINTS.LOGIN, credentials);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login error');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return rejectWithValue('No refresh token found');
    }
    try {
      const res = await axios.post(API_ENDPOINTS.REFRESH, { refreshToken });
      localStorage.setItem('accessToken', res.data.accessToken);
      return res.data;
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(
        err.response?.data?.message || 'Refresh token error'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(API_ENDPOINTS.LOGOUT);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Logout error');
    }
  }
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ newPassword, confirmPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        return rejectWithValue('Необхідна авторизація');
      }

      const res = await axios.patch(
        `${BASE_URL}users/profile/password`,
        { newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue('Необхідна авторизація');
      } else if (err.response?.status === 400) {
        return rejectWithValue(err.response?.data?.message || 'Невірний формат даних');
      } else if (err.response?.status === 404) {
        return rejectWithValue('Користувача не знайдено');
      } else {
        return rejectWithValue(err.response?.data?.message || 'Помилка зміни паролю');
      }
    }
  }
);
