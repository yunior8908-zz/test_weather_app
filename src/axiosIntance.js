import axios from 'axios';
import { API_BASE_URL, APP_WEATHER_KEY, UNITS } from './config';

const axiosIntance = axios.create({
  baseURL: API_BASE_URL
});

axiosIntance.interceptors.request.use(config => {
  const params = { ...config.params, APPID: APP_WEATHER_KEY, units: UNITS };
  return { ...config, params };
});

export default axiosIntance;
