import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({ baseURL: "https://vlog-backend-728s.onrender.com" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message === "Token invalid / expired" && error.response.status === 401) {
      toast.error("Session expired! Please login again.");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/session-expired";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default API;
