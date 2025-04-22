import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../../api/api';

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
      const res = await axios.post(API_ENDPOINTS.AUTH.REFRESH, {
        refreshToken,
      });
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
