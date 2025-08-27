import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";

function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`py-6 border-t text-sm ${
        darkMode ? "bg-gray-900 text-gray-300 border-gray-700" : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* About */}
        <div>
          <h3 className={`font-semibold mb-2 ${darkMode ? "text-teal-400" : "text-teal-600"}`}>ProLMS</h3>
          <p className="text-xs">
            Enhance your skills with online courses anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            {["About", "Courses", "My Courses", "Contact"].map((link, i) => (
              <li key={i}>
                <a href={`/${link.toLowerCase().replace(" ", "")}`} className="hover:text-teal-500 text-xs">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-2">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 text-center text-xs border-t pt-2">
        &copy; {new Date().getFullYear()} Sagar. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
