import React, { useEffect, useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import api from "../api/axios"; // ✅ axios instance

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
      console.error(err);
      setError("Failed to fetch courses. Please try again.");
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
      console.error(err);
      setError("Failed to fetch enrollments. Please try again.");
    }
  };

  useEffect(() => { fetchEnrollments(); }, [token]);
  useEffect(() => { fetchCourses(); }, [filters, page]);

  const handleEnroll = async (courseId) => {
    if (!token) { alert("Please login"); navigate("/login"); return; }
    setError("");
    try {
      const res = await api.post("/enrollments", { courseId }, { headers: { Authorization: `Bearer ${token}` } });
      setEnrollments([...enrollments, res.data]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to enroll.");
    }
  };

  const handleUnenroll = async (enrollmentId) => {
    setError("");
    try {
      await api.delete(`/enrollments/${enrollmentId}`, { headers: { Authorization: `Bearer ${token}` } });
      setEnrollments(enrollments.filter((e) => e.id !== enrollmentId));
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to unenroll.");
    }
  };

  const getEnrollment = (courseId) => enrollments.find((e) => e.courseId === courseId);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 shadow px-4 py-6 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-4">
          Explore and enroll in professional-level courses curated for learners.
        </p>
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <FilterBar filters={filters} onFilterChange={(newFilters) => { setFilters(newFilters); setPage(1); }} />
          </div>
        </div>
        {error && <p className="mt-2 text-center text-red-600 dark:text-red-400 text-sm">{error}</p>}
      </div>

      {/* Courses Grid */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {loading ? <p>Loading courses...</p> : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => {
              const enrollment = getEnrollment(course.id);
              return (
                <div key={course.id} className={`flex flex-col rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition transform hover:scale-[1.02] hover:shadow-xl duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                  <div className="h-36 w-full overflow-hidden">
                    <img src={course.image || "https://via.placeholder.com/400x200.png?text=Course+Image"} alt={course.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col p-4 flex-grow">
                    <h2 className="text-lg font-semibold mb-1">{course.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span>{course.category}</span>
                      <span className="capitalize">{course.level}</span>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => navigate(`/courses/${course.id}`)} className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-400 dark:to-blue-500 text-white font-medium text-sm px-2 py-1.5 rounded-lg hover:opacity-90 transition">View</button>
                      {enrollment ? (
                        <button onClick={() => handleUnenroll(enrollment.id)} className="flex-1 bg-red-600 text-white text-sm font-medium px-2 py-1.5 rounded-lg hover:bg-red-700 transition">Unenroll</button>
                      ) : (
                        <button onClick={() => handleEnroll(course.id)} className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm font-medium px-2 py-1.5 rounded-lg hover:opacity-90 transition">Enroll</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : <p className="text-center mt-10 text-lg">No courses found.</p>}

        <div className="mt-8 flex justify-center">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default Courses;
