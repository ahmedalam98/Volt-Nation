import axios from "axios";

// Interceptor to add token to every request
const api = axios.create({
  // baseURL: "https://volt-nation.up.railway.app",
  baseURL: "https://volt-nation.up.railway.app/",
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
