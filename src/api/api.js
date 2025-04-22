import axios from 'axios';

const BASE_URL = 'http://185.198.166.5:3000/';
export const API_ENDPOINTS = {
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
