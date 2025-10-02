
import axios from "axios";

const http = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Inyecta token en cada request si existe
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth.token");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default http;
