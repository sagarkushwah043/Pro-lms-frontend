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
    <nav className="bg-gray-800 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/HomePage"
          className="text-2xl font-bold text-teal-400"
        >
          ProLMS
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-1 rounded ${
                location.pathname === item.path
                  ? "text-teal-400 font-semibold"
                  : "text-gray-200 hover:text-teal-400"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2"
          >
            {darkMode ? <FaSun className="text-teal-400" /> : <FaMoon className="text-gray-200" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-200"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-800 dark:bg-gray-900 px-4 py-2 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded ${
                location.pathname === item.path
                  ? "text-teal-400 font-semibold"
                  : "text-gray-200 hover:text-teal-400"
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
            className="w-full px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full p-2 mt-2"
          >
            {darkMode ? <FaSun className="text-teal-400" /> : <FaMoon className="text-gray-200" />}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
