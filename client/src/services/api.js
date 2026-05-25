import axios from 'axios';

const ensureApiBaseUrl = (value) => {
  const trimmedValue = String(value || 'http://localhost:5000/api').replace(/\/+$/, '');
  return /\/api$/i.test(trimmedValue) ? trimmedValue : `${trimmedValue}/api`;
};

const normalizedBaseUrl = ensureApiBaseUrl(process.env.REACT_APP_SERVER_URL);

const instance = axios.create({
  baseURL: normalizedBaseUrl,
});

export default instance;
