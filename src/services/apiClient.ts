import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
    "Authorization": localStorage.getItem("userToken")
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;