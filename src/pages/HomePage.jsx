import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

function HomePage() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`py-16 text-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to ProLMS</h1>
        <p className="max-w-2xl mx-auto text-lg">
          ProLMS is a Learning Management System designed for modern learners.
          Explore courses created by experts and track your progress easily.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2 rounded bg-blue-600 text-white"
          >
            Explore Courses
          </button>
          <button
            onClick={() => navigate("/enrolled")}
            className="px-6 py-2 rounded border border-blue-600 text-blue-600"
          >
            My Courses
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why Choose ProLMS?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Expert Instructors",
              desc: "Learn from industry experts who provide high-quality content.",
            },
            {
              title: "Flexible Learning",
              desc: "Access courses anytime, anywhere, and learn at your own pace.",
            },
            {
              title: "Track Progress",
              desc: "Monitor your learning journey and stay motivated.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 rounded ${
                darkMode ? "bg-gray-800" : "bg-white border"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-12 text-center ${
          darkMode ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Start Learning Today!</h2>
        <p className="mb-6">
          {darkMode
            ? "Explore our courses and boost your skills."
            : "Browse our wide range of courses and boost your skills."}
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="px-6 py-2 rounded bg-blue-600 text-white"
        >
          Explore Courses
        </button>
      </section>
    </div>
  );
}

export default HomePage;
