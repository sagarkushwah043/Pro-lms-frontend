import React from "react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const { darkMode } = useTheme();
  const navigate = useNavigate(); // React Router navigation

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-red-500">
        404
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/homepage")} // Navigate to homepage
        className={`px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-teal-700 to-blue-800 text-white"
            : "bg-gradient-to-r from-teal-500 to-blue-600 text-white"
        }`}
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;
