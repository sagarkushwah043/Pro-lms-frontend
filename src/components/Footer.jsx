import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

function Footer() {
  const { darkMode } = useTheme(); // access darkMode if needed

  return (
    <footer
      className={`transition-colors duration-300 py-6 border-t ${
        darkMode ? "bg-gray-900 text-gray-200 border-gray-700" : "bg-white text-gray-800 border-gray-300"
      }`}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">

        {/* About Section */}
        <div className="p-4">
          <h3 className={`${darkMode ? "text-teal-400" : "text-teal-600"} text-lg font-bold mb-2`}>
            ProLMS
          </h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} leading-snug text-xs md:text-sm`}>
            Enhance your skills with quality online courses anytime, anywhere. Join thousands of learners worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div className="p-4">
          <h3 className={`${darkMode ? "text-gray-200" : "text-gray-800"} text-sm font-semibold mb-2`}>Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/about"
                className={`transition duration-200 text-xs md:text-sm hover:text-teal-500 ${
                  darkMode ? "dark:hover:text-teal-400" : ""
                }`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/courses"
                className={`transition duration-200 text-xs md:text-sm hover:text-teal-500 ${
                  darkMode ? "dark:hover:text-teal-400" : ""
                }`}
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/enrolled"
                className={`transition duration-200 text-xs md:text-sm hover:text-teal-500 ${
                  darkMode ? "dark:hover:text-teal-400" : ""
                }`}
              >
                My Courses
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className={`transition duration-200 text-xs md:text-sm hover:text-teal-500 ${
                  darkMode ? "dark:hover:text-teal-400" : ""
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="p-4">
          <h3 className={`${darkMode ? "text-gray-200" : "text-gray-800"} text-sm font-semibold mb-2`}>
            Follow Us
          </h3>
          <div className="flex space-x-2 mt-1">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className={`w-8 h-8 flex items-center justify-center rounded-full transition duration-300 text-sm
                  ${darkMode ? "bg-gray-800 hover:text-white" : "bg-gray-200 hover:text-white"}
                  ${
                    index === 0
                      ? "hover:bg-blue-600"
                      : index === 1
                      ? "hover:bg-blue-400"
                      : index === 2
                      ? "hover:bg-blue-700"
                      : "hover:bg-pink-500"
                  }`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mt-6 text-center pt-2 text-xs md:text-sm border-t ${
          darkMode ? "border-gray-700 text-gray-400" : "border-gray-300 text-gray-500"
        }`}
      >
        &copy; {new Date().getFullYear()} Sagar. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
