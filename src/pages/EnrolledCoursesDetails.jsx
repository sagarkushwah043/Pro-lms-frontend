import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import api from "../api/axios"; // ✅ use central axios instance

function EnrolledCourseDetail() {
  const { id } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const enrolledAt = location.state?.enrolledAt;

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
      setLoading(false);
    };
    fetchCourse();
  }, [id, token]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="w-12 h-12 border-4 border-t-4 border-gradient-to-r from-teal-500 to-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-red-500 text-lg">Course not found.</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={() => navigate(-1)}
        className={`mb-6 px-4 py-2 rounded-lg font-medium transition ${
          darkMode
            ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
            : "bg-gray-300 hover:bg-gray-400 text-gray-900"
        }`}
      >
        ← Back
      </button>

      <div
        className={`max-w-4xl mx-auto rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 p-6 md:p-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Course Image */}
        <img
          src={course?.image || "https://via.placeholder.com/400x300"}
          alt={course?.title}
          className="rounded-xl w-full md:w-1/2 h-64 md:h-auto object-cover"
        />

        {/* Course Content */}
        <div className="flex flex-col flex-1 gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{course?.title}</h1>
          <p className={darkMode ? "text-gray-300 leading-relaxed" : "text-gray-700 leading-relaxed"}>
            {course?.description}
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <span>📘 Level: {course?.level}</span>
            <span>📂 Category: {course?.category}</span>
          </div>

          {enrolledAt && (
            <p className="text-sm text-gray-400 mt-2">
              Enrolled on: {new Date(enrolledAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourseDetail;
