import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import api from "../api/axios"; // ✅ use central axios instance

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);

  // Fetch course & enrollment status
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch course from deployed backend
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);

        if (token) {
          // Fetch enrollments
          const enrollRes = await api.get("/enrollments", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const enrollment = enrollRes.data.find(
            (e) => e.courseId === id || e.courseId === Number(id)
          );

          if (enrollment) {
            setEnrolled(true);
            setEnrollmentId(enrollment.id);
          }
        }
      } catch (err) {
        console.error("Error fetching course:", err.response?.data || err.message);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id, token]);

  // Enroll course
  const handleEnroll = async () => {
    if (!token) {
      alert("Please login to enroll");
      navigate("/");
      return;
    }
    try {
      const res = await api.post(
        "/enrollments",
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolled(true);
      setEnrollmentId(res.data.id);
    } catch (err) {
      console.error("Error enrolling:", err.response?.data || err.message);
    }
  };

  // Unenroll course
  const handleUnenroll = async () => {
    if (!enrollmentId) return;
    try {
      await api.delete(`/enrollments/${enrollmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolled(false);
      setEnrollmentId(null);
    } catch (err) {
      console.error("Error unenrolling:", err.response?.data || err.message);
    }
  };

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
      {/* Back Button */}
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

      {/* Course Container */}
      <div
        className={`max-w-4xl mx-auto rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 p-6 md:p-8 transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Course Image */}
        <img
          src={course.image || "https://via.placeholder.com/800x400"}
          alt={course.title}
          className="rounded-xl w-full md:w-1/2 h-64 md:h-auto object-cover"
        />

        {/* Course Content */}
        <div className="flex flex-col flex-1 gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{course.title}</h1>
          <p
            className={
              darkMode ? "text-gray-300 leading-relaxed" : "text-gray-700 leading-relaxed"
            }
          >
            {course.description}
          </p>

          {/* Meta Info */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm sm:text-base ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span>📘 Level: {course.level}</span>
            <span>📂 Category: {course.category}</span>
          </div>

          {/* Enroll / Unenroll Button */}
          <div className="mt-4">
            {enrolled ? (
              <button
                onClick={handleUnenroll}
                className="w-full md:w-48 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
              >
                ❌ Unenroll
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full md:w-48 bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
              >
                🚀 Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
