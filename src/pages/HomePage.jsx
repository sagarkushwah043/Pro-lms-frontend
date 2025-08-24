import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function HomePage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}`}>

      {/* Hero Section */}
      <section className={`text-white py-24 transition-colors duration-300 ${darkMode ? "bg-gradient-to-r from-teal-700 to-blue-800" : "bg-gradient-to-r from-teal-500 to-blue-600"}`}>
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Welcome to ProLMS</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            ProLMS is a professional Learning Management System designed for modern learners. Explore our wide variety of courses created by industry experts and track your progress easily.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate("/courses")}
              className="font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 bg-gradient-to-r from-teal-500 to-blue-600 text-white"
            >
              Explore Courses
            </button>
            <button
              onClick={() => navigate("/enrolled")}
              className="font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
            >
              My Courses
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose ProLMS?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Expert Instructors",
              desc: "Learn from industry experts who provide high-quality content and guidance for your career growth.",
            },
            {
              title: "Flexible Learning",
              desc: "Access courses anytime, anywhere. Learn at your own pace with our easy-to-use platform.",
            },
            {
              title: "Track Progress",
              desc: "Monitor your learning journey and track completed courses to stay motivated and achieve your goals.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className="text-2xl font-semibold mb-3 text-teal-500 dark:text-teal-400">{feature.title}</h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-700"}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-20 mt-12 text-center px-4 transition-colors duration-300 ${darkMode ? "bg-gradient-to-r from-teal-900 to-blue-900 text-gray-200" : "bg-gradient-to-r from-teal-100 to-blue-100 text-gray-800"}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Learning Today!</h2>
        <p className="mb-8">{darkMode ? "Explore our courses and boost your skills in dark mode." : "Explore our wide range of courses and boost your skills with ProLMS."}</p>
        <button
          onClick={() => navigate("/courses")}
          className={`font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300 ${darkMode ? "bg-gradient-to-r from-teal-700 to-blue-800 text-white" : "bg-gradient-to-r from-teal-500 to-blue-600 text-white"}`}
        >
          Explore Courses
        </button>
      </section>

    </div>
  );
}

export default HomePage;
