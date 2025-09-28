import React, { useEffect, useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import api from "../api/axios";

function Courses() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [filters, setFilters] = useState({ search: "", level: "", category: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, limit: 6, ...filters };
      const res = await api.get("/courses", { params });
      setCourses(res.data.data);
      setTotalPages(Math.ceil(res.data.total / res.data.limit));
    } catch (err) {
      setError("Failed to fetch courses.");
    }
    setLoading(false);
  };

  // Fetch enrollments
  const fetchEnrollments = async () => {
    if (!token) return;
    try {
      const res = await api.get("/enrollments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrollments(res.data);
    } catch (err) {
      setError("Failed to fetch enrollments.");
    }
  };

  useEffect(() => { fetchEnrollments(); }, [token]);
  useEffect(() => { fetchCourses(); }, [filters, page]);

  const handleEnroll = async (courseId) => {
    if (!token) { alert("Please login"); navigate("/login"); return; }
    try {
      const res = await api.post("/enrollments", { courseId }, { headers: { Authorization: `Bearer ${token}` } });
      setEnrollments([...enrollments, res.data]);
    } catch {
      setError("Failed to enroll.");
    }
  };

  const handleUnenroll = async (enrollmentId) => {
    try {
      await api.delete(`/enrollments/${enrollmentId}`, { headers: { Authorization: `Bearer ${token}` } });
      setEnrollments(enrollments.filter((e) => e.id !== enrollmentId));
    } catch {
      setError("Failed to unenroll.");
    }
  };

  const getEnrollment = (courseId) => enrollments.find((e) => e.courseId === courseId);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className={`p-6 border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
        <h1 className="text-center text-3xl font-bold mb-4">Explore Courses</h1>
        <div className="max-w-2xl mx-auto">
          <FilterBar
            filters={filters}
            onFilterChange={(newFilters) => { setFilters(newFilters); setPage(1); }}
          />
        </div>
        {error && <p className="text-center text-red-500 text-sm mt-3">{error}</p>}
      </div>

      {/* Courses Section */}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div
              className={`w-14 h-14 border-4 border-t-transparent rounded-full animate-spin ${
                darkMode ? "border-teal-400" : "border-indigo-600"
              }`}
            ></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const enrollment = getEnrollment(course.id);
              return (
                <div
                  key={course.id}
                  className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border ${
                    darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  <img
                    src={course.image || "https://via.placeholder.com/400x200.png?text=Course+Image"}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-semibold text-base mb-1 line-clamp-1">{course.title}</h2>
                    <p className="text-sm mb-3 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {course.description?.slice(0, 80)}...
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {course.category} • {course.level}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="flex-1 px-3 py-2 text-sm border rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        View
                      </button>
                      {enrollment ? (
                        <button
                          onClick={() => handleUnenroll(enrollment.id)}
                          className="flex-1 px-3 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course.id)}
                          className="flex-1 px-3 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        >
                          Enroll
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center mt-10 text-gray-500">No courses found.</p>
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default Courses;
