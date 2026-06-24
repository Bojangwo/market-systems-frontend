import axios from "axios";

const API = axios.create({
  baseURL: "https://market-systems-backend.onrender.com",
});

export const IMAGE_URL = "http://localhost:5000/uploads";

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;