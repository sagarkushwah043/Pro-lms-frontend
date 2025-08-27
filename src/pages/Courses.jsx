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
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      {/* Header */}
      <div className={`p-4 border-b ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
        <p className="text-center text-sm mb-3">Explore Courses</p>
        <div className="max-w-xl mx-auto">
          <FilterBar
            filters={filters}
            onFilterChange={(newFilters) => { setFilters(newFilters); setPage(1); }}
          />
        </div>
        {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Courses */}
      <div className="p-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : courses.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const enrollment = getEnrollment(course.id);
              return (
                <div key={course.id} className={`border p-3 rounded ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
                  <img
                    src={course.image || "https://via.placeholder.com/400x200.png?text=Course+Image"}
                    alt={course.title}
                    className="w-full h-32 object-cover mb-2 rounded"
                  />
                  <h2 className="font-medium text-sm mb-1">{course.title}</h2>
                  <p className="text-xs mb-2">{course.description?.slice(0, 60)}...</p>
                  <p className="text-xs text-gray-500 mb-3">{course.category} • {course.level}</p>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/courses/${course.id}`)} className="flex-1 px-2 py-1 text-xs border rounded">
                      View
                    </button>
                    {enrollment ? (
                      <button onClick={() => handleUnenroll(enrollment.id)} className="flex-1 px-2 py-1 text-xs border rounded">
                        Unenroll
                      </button>
                    ) : (
                      <button onClick={() => handleEnroll(course.id)} className="flex-1 px-2 py-1 text-xs border rounded">
                        Enroll
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center mt-10">No courses found.</p>
        )}

        <div className="mt-6 flex justify-center">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}

export default Courses;
