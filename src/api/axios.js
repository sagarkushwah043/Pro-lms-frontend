import axios from "axios";

// Use environment variable for deployed backend, fallback to localhost:4000
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  withCredentials: true, // only needed if backend uses cookies/auth
});

export default API;
