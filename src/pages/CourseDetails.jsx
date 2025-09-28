import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import api from "../api/axios";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);

        if (token) {
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

  const handleEnroll = async () => {
    if (!token) {
      alert("Please login to enroll");
      navigate("/login");
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
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <div
          className={`w-14 h-14 border-4 border-t-transparent rounded-full animate-spin ${
            darkMode ? "border-teal-400" : "border-indigo-600"
          }`}
        ></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <p className="text-red-500 font-medium text-lg">⚠️ Course not found.</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
            darkMode
              ? "border-gray-700 hover:bg-gray-800"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          ← Back
        </button>
      </div>

      {/* Course Card */}
      <div
        className={`max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden border ${
          darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        {/* Image */}
        <img
          src={course.image || "https://via.placeholder.com/800x400?text=Course+Image"}
          alt={course.title}
          className="w-full h-72 object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {course.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
              📘 {course.level}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
              📂 {course.category}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {enrolled ? (
              <button
                onClick={handleUnenroll}
                className="px-6 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Unenroll
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
