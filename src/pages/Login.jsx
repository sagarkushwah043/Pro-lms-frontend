import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function Login() {
  const { darkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password ❌");
      return;
    }

    if (username === "student123" && password === "1234") {
      localStorage.setItem("token", "fakeStudent123");
      navigate("/homepage");
    } else {
      setError("Invalid credentials ❌");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-sm p-6 rounded-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300"
            }`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300"
            }`}
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <p className="text-xs text-center mt-4">
          Demo → Username: <b>student123</b>, Password: <b>1234</b>
        </p>
      </div>
    </div>
  );
}

export default Login;
