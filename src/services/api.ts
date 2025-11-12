import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Holt URL aus .env.production
  withCredentials: true, // Optional, falls du Cookies oder Login nutzt
});

export default api;
