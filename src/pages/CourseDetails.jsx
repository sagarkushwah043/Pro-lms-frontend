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
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <p className="text-red-500">Course not found.</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 border rounded"
      >
        ← Back
      </button>

      {/* Course Container */}
      <div
        className={`max-w-3xl mx-auto border rounded p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Image */}
        <img
          src={course.image || "https://via.placeholder.com/800x400"}
          alt={course.title}
          className="w-full h-60 object-cover rounded"
        />

        {/* Content */}
        <h1 className="text-2xl font-semibold mt-4">{course.title}</h1>
        <p className="mt-2">{course.description}</p>

        <div className="mt-2 text-sm">
          <span>📘 Level: {course.level}</span> |{" "}
          <span>📂 Category: {course.category}</span>
        </div>

        {/* Buttons */}
        <div className="mt-4">
          {enrolled ? (
            <button
              onClick={handleUnenroll}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Unenroll
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
