import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function Login() {
  const { darkMode } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (!username || !password) {
        setError("Please enter both username and password ❌");
        setLoading(false);
        return;
      }

      if (username === "student123" && password === "1234") {
        localStorage.setItem("token", "fakeStudent123");
        navigate("/homepage");
      } else {
        setError("Invalid credentials ❌");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Logo / Title */}
        <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-2">
          ProLMS
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to continue your learning journey 🚀
        </p>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-500"
            }`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400"
                : "bg-gray-50 border-gray-300 focus:ring-blue-500"
            }`}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {/* Demo Credentials */}
        <p className="text-xs text-center mt-6 text-gray-500">
          Demo → Username: <b>student123</b>, Password: <b>1234</b>
        </p>
      </div>
    </div>
  );
}

export default Login;
