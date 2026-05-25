import axios from 'axios';

const configuredBaseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000/api';
const normalizedBaseUrl = configuredBaseUrl.replace(/\/+$/, '');

const instance = axios.create({
  baseURL: normalizedBaseUrl,
});

export default instance;
