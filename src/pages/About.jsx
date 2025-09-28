import React from "react";
import { useTheme } from "../Context/ThemeContext";

function About() {
  const { darkMode } = useTheme();

  const features = [
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
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`py-16 text-center px-6 ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          About <span className="text-teal-500">ProLMS</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          ProLMS is a professional Learning Management System designed for
          modern learners. Explore our platform with an intuitive interface,
          high-quality courses, and personalized learning experience.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          Why Choose <span className="text-teal-500">ProLMS?</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl shadow-sm transition-all transform hover:-translate-y-1 hover:shadow-md ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-3 text-teal-500">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-16 text-center px-6 ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Start Learning <span className="text-teal-500">Today!</span>
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-sm md:text-base">
          {darkMode
            ? "Explore our courses and boost your skills in dark mode."
            : "Explore our wide range of courses and boost your skills with ProLMS."}
        </p>
        <button
          onClick={() => (window.location.href = "/courses")}
          className="px-6 py-2 md:px-8 md:py-3 rounded-md font-medium text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:opacity-90 transition-all"
        >
          Explore Courses
        </button>
      </section>
    </div>
  );
}

export default About;
