import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "My Courses", path: "/enrolled" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <Link
            to="/HomePage"
            className={`text-2xl font-extrabold tracking-wide ${
              darkMode ? "text-teal-400" : "text-teal-600"
            } hover:opacity-90 transition`}
          >
            ProLMS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-semibold px-3 py-2 rounded-md transition-all duration-200 ${
                  location.pathname === item.path
                    ? darkMode
                      ? "text-teal-400 bg-gray-800"
                      : "text-teal-600 bg-gray-100"
                    : darkMode
                    ? "text-gray-300 hover:text-teal-400 hover:bg-gray-800"
                    : "text-gray-600 hover:text-teal-600 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="text-sm font-medium px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-3 p-2 rounded-full border transition-all ${
                darkMode
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-lg" />
              ) : (
                <FaMoon className="text-gray-600 text-lg" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-2xl focus:outline-none"
            >
              {mobileOpen ? (
                <FaTimes className={darkMode ? "text-gray-300" : "text-gray-700"} />
              ) : (
                <FaBars className={darkMode ? "text-gray-300" : "text-gray-700"} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className={`md:hidden px-6 py-4 space-y-3 border-t transition-colors ${
              darkMode
                ? "bg-gray-950 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-semibold px-3 py-2 rounded-md transition-all ${
                  location.pathname === item.path
                    ? darkMode
                      ? "text-teal-400 bg-gray-800"
                      : "text-teal-600 bg-gray-100"
                    : darkMode
                    ? "text-gray-300 hover:text-teal-400 hover:bg-gray-800"
                    : "text-gray-600 hover:text-teal-600 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={() => {
                handleLogout();
                setMobileOpen(false);
              }}
              className="w-full text-sm font-medium px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Logout
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {darkMode ? (
                <>
                  <FaSun className="text-yellow-400" /> <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FaMoon className="text-gray-600" /> <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        )}
      </nav>

      {/* Spacer to avoid collapsing */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
