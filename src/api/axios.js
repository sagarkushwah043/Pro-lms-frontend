import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ deployed backend
  withCredentials: true, // only needed if backend uses cookies/auth
});

export default API;
