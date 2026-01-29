import axios from "axios";

const api = axios.create({
 baseURL: "https://sleep-ai-model-2.onrender.com"

});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log('Token from localStorage:', token); // Debug log
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set:', config.headers.Authorization); // Debug log
  } else {
    console.log('No token found in localStorage'); // Debug log
  }
  return config;
});

// Log all requests
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.baseURL + config.url, config);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Log all responses
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.method?.toUpperCase(), response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    // Don't redirect to login for demo mode
    return Promise.reject(error);
  }
);

export default api;
