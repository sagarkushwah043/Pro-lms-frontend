import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function Login() {
  const { darkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validate empty fields
    if (!username || !password) {
      alert("Please enter both username and password ❌");
      return;
    }

    // Check credentials
    if (username === "student123" && password === "1234") {
      const fakeToken = "fakeStudent123";
      localStorage.setItem("token", fakeToken);
      navigate("/homepage"); // Use lowercase to match route
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-sm p-8 rounded-2xl shadow-2xl transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
          Sign in to your ProLMS account
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-teal-400"
                : "bg-gray-50 border-gray-300 text-gray-800 focus:ring-teal-500"
            }`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 focus:ring-teal-400"
                : "bg-gray-50 border-gray-300 text-gray-800 focus:ring-teal-500"
            }`}
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl font-semibold text-white shadow-lg bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-600 dark:to-blue-700 hover:shadow-2xl hover:scale-105 transition transform duration-300"
          >
            Login
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="text-center mt-6 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
          Demo credentials:<br />
          Username: <span className="font-medium">student123</span>, Password:{" "}
          <span className="font-medium">1234</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
