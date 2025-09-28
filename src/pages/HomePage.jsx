import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import { BookOpen, Clock, TrendingUp } from "lucide-react"; // Icons

function HomePage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const features = [
    {
      title: "Expert Instructors",
      desc: "Learn from industry professionals with real-world experience.",
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    },
    {
      title: "Flexible Learning",
      desc: "Access courses anytime, anywhere, and learn at your own pace.",
      icon: <Clock className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Track Progress",
      desc: "Monitor your learning journey and stay motivated.",
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`py-20 px-6 text-center shadow-md ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 to-gray-900"
            : "bg-gradient-to-r from-blue-50 to-blue-100"
        }`}
      >
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-blue-600">ProLMS</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          A modern Learning Management System designed for today’s learners.
          Explore courses created by experts and track your progress with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            onClick={() => navigate("/courses")}
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            🚀 Explore Courses
          </button>
          <button
            onClick={() => navigate("/enrolled")}
            className="px-8 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold shadow hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            📘 My Courses
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-blue-600">ProLMS?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-xl shadow-lg transition transform hover:-translate-y-2 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-center">
                {f.title}
              </h3>
              <p className="text-center opacity-80">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-16 text-center shadow-inner ${
          darkMode ? "bg-gray-800" : "bg-blue-50"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4">
          Start Your Learning Journey Today!
        </h2>
        <p className="mb-6 opacity-90">
          {darkMode
            ? "Unlock expert-led courses and level up your skills."
            : "Browse our wide range of expert courses and grow your skills."}
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          🎓 Explore Courses
        </button>
      </section>
    </div>
  );
}

export default HomePage;
