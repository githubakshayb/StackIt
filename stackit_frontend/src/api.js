import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('refresh_token');

      try {
        const res = await axios.post('http://localhost:8000/api/auth/refresh/', { refresh });
        const newToken = res.data.access;
        localStorage.setItem('access_token', newToken);
        original.headers['Authorization'] = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshErr) {
        console.log('Token refresh failed');
      }
    }

    return Promise.reject(err);
  }
);

export default api;
