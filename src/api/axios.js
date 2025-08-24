// frontend/src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api" // ✅ local backend
      : "https://pro-lms-backend.onrender.com/api", // ✅ deployed backend
  withCredentials: true,
});

export default API;
