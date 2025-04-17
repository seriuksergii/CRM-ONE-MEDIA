import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://185.198.166.5:3000/';
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}auth/login`,
    REGISTER: `${BASE_URL}auth/register`,
    REFRESH: `${BASE_URL}auth/refresh`,
    LOGOUT: `${BASE_URL}auth/logout`,
  },
  USERS: {
    BASE: `${BASE_URL}users`,
    PROFILE: {
      ME: `${BASE_URL}users/profile/me`,
      PASSWORD: `${BASE_URL}users/profile/password`,
    },
    BY_ID: (id) => `${BASE_URL}users/${id}`,
    ROLE: (id) => `${BASE_URL}users/${id}/role`,
    ROLE_AND_TEAM: (id) => `${BASE_URL}users/${id}/role-and-team`,
    TEAMS: `${BASE_URL}users/teams`,
    ROLES: `${BASE_URL}users/roles`,
  },
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
      const res = await axios.post(API_ENDPOINTS.AUTH.REGISTER, userData);
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
      const res = await axios.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
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
      const res = await axios.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
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
      await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
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
        API_ENDPOINTS.USERS.PROFILE.PASSWORD,
        { newPassword, confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        return rejectWithValue('Необхідна авторизація');
      } else if (err.response?.status === 400) {
        return rejectWithValue(
          err.response?.data?.message || 'Невірний формат даних'
        );
      } else if (err.response?.status === 404) {
        return rejectWithValue('Користувача не знайдено');
      } else {
        return rejectWithValue(
          err.response?.data?.message || 'Помилка зміни паролю'
        );
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.USERS.BASE);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch users'
      );
    }
  }
);

export const getUserById = createAsyncThunk(
  'users/getById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.USERS.BY_ID(id));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'users/updateRole',
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(API_ENDPOINTS.USERS.ROLE(id), { role });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update role'
      );
    }
  }
);

export const updateUserRoleAndTeam = createAsyncThunk(
  'users/updateRoleAndTeam',
  async ({ id, role, team }, { rejectWithValue }) => {
    try {
      const response = await axios.put(API_ENDPOINTS.USERS.ROLE_AND_TEAM(id), {
        role,
        team,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update user'
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(API_ENDPOINTS.USERS.BY_ID(id));
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete user'
      );
    }
  }
);

export const getTeams = createAsyncThunk(
  'users/getTeams',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.USERS.TEAMS);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch teams'
      );
    }
  }
);

export const getCurrentUserProfile = createAsyncThunk(
  'users/getCurrentProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.USERS.PROFILE.ME);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

export const getRoles = createAsyncThunk(
  'users/getRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.USERS.ROLES);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch roles'
      );
    }
  }
);