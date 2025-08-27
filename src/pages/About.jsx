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
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`py-16 text-center ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h1 className="text-4xl font-bold mb-4">About ProLMS</h1>
        <p className="max-w-2xl mx-auto">
          ProLMS is a professional Learning Management System designed for
          modern learners. Explore our platform with an intuitive interface,
          high-quality courses, and personalized learning experience.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Why Choose ProLMS?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 rounded border ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-16 text-center ${
          darkMode ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Start Learning Today!</h2>
        <p className="mb-6">
          {darkMode
            ? "Explore our courses and boost your skills in dark mode."
            : "Explore our wide range of courses and boost your skills with ProLMS."}
        </p>
        <button
          onClick={() => (window.location.href = "/courses")}
          className={`px-6 py-2 rounded ${
            darkMode
              ? "bg-blue-700 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          Explore Courses
        </button>
      </section>
    </div>
  );
}

export default About;
