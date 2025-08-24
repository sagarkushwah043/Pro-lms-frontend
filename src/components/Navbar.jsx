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
    <nav className="bg-gradient-to-r from-slate-800 to-gray-900 shadow-lg transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/HomePage"
          className="text-3xl font-extrabold text-teal-400 dark:text-teal-300"
        >
          ProLMS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-semibold px-3 py-2 rounded-lg transition-colors duration-300 ${
                location.pathname === item.path
                  ? "bg-teal-500 bg-opacity-25 text-teal-400 dark:bg-teal-400 dark:text-gray-900"
                  : "text-gray-200 dark:text-gray-300 hover:bg-teal-500 hover:bg-opacity-20 hover:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-gray-900"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg transition-colors duration-300"
          >
            Logout
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {darkMode ? (
              <FaSun className="text-teal-400 transition duration-300" />
            ) : (
              <FaMoon className="text-gray-200 transition duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md text-gray-200 hover:bg-gray-700 hover:text-teal-400 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gradient-to-b from-slate-800 to-gray-900 shadow-md px-4 py-2 space-y-2 transition-colors duration-300">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block font-semibold px-3 py-2 rounded-lg transition-colors duration-300 ${
                location.pathname === item.path
                  ? "bg-teal-500 bg-opacity-25 text-teal-400 dark:bg-teal-400 dark:text-gray-900"
                  : "text-gray-200 dark:text-gray-300 hover:bg-teal-500 hover:bg-opacity-20 hover:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-gray-900"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={() => {
              handleLogout();
              setMobileOpen(false);
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg transition-colors duration-300"
          >
            Logout
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full mt-2 p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            {darkMode ? (
              <FaSun className="text-teal-400 transition duration-300" />
            ) : (
              <FaMoon className="text-gray-200 transition duration-300" />
            )}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
