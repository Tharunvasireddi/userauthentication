import axios from "axios";
import useAuthStore from "../store/auth.js";
const api = axios.create({
  baseURL: "https://userauthentication-czqc.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use((congif) => {
  const token = useAuthStore.getState().token;
  if (token) {
    congif.headers.Authorization = `Bearer ${token}`;
  }
  return congif;
});

export default api;
