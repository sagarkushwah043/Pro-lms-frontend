import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`py-5 border-t text-xs transition-all ${
        darkMode
          ? "bg-gray-950 text-gray-400 border-gray-800"
          : "bg-gray-50 text-gray-600 border-gray-200"
      }`}
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Brand */}
        <div>
          <h3
            className={`text-base font-bold mb-2 ${
              darkMode ? "text-teal-400" : "text-teal-600"
            }`}
          >
            ProLMS
          </h3>
          <p className="text-[11px] leading-snug">
            Learn anytime, anywhere. Boost your skills with ProLMS.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            className={`text-sm font-semibold mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Quick Links
          </h3>
          <ul className="space-y-1">
            {["About", "Courses", "My Courses", "Contact"].map((link, i) => (
              <li key={i}>
                <a
                  href={`/${link.toLowerCase().replace(" ", "")}`}
                  className={`hover:text-teal-500 transition-colors ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3
            className={`text-sm font-semibold mb-2 ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            Follow Us
          </h3>
          <div className="flex space-x-2">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`p-1.5 rounded-full transition-all hover:scale-110 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-teal-600 text-gray-300"
                      : "bg-gray-200 hover:bg-teal-500 hover:text-white text-gray-700"
                  }`}
                >
                  <Icon size={12} />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div
        className={`mt-5 text-center text-[11px] border-t pt-3 ${
          darkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        © {new Date().getFullYear()} <span className="font-medium">Sagar</span>.
        All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
