import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-backend-api-url.com', // Placeholder
  timeout: 10000,
});

// Add interceptors or headers if needed

export default api;
