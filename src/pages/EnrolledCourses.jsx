import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import api from "../api/axios"; // ✅ use central axios instance

function EnrolledCourses() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const limit = 6;

  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", category: "", level: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEnrolled = async () => {
    setLoading(true);
    try {
      const res = await api.get("/enrollments", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit },
      });

      const data = res.data.data || res.data;

      const coursesWithDetails = await Promise.all(
        data.map(async (enroll) => {
          const courseRes = await api.get(`/courses/${enroll.courseId}`);
          return { ...enroll, course: courseRes.data };
        })
      );

      setEnrolled(coursesWithDetails);
      const totalCount = res.data.total || coursesWithDetails.length;
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnrolled();
  }, [page]);

  const handleUnenroll = async (enrollId) => {
    try {
      await api.delete(`/enrollments/${enrollId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrolled((prev) => prev.filter((e) => e.id !== enrollId));
    } catch (err) {
      console.error("Error unenrolling:", err);
    }
  };

  const filtered = enrolled.filter((e) => {
    const title = e.course?.title?.toLowerCase() || "";
    const desc = e.course?.description?.toLowerCase() || "";
    return (
      (title.includes(filters.search.toLowerCase()) || desc.includes(filters.search.toLowerCase())) &&
      (filters.category ? e.course?.category === filters.category : true) &&
      (filters.level ? e.course?.level === filters.level : true)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-dashed border-blue-500 dark:border-teal-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">🎓 My Enrolled Courses</h1>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filtered.map((e) => (
            <div
              key={e.id}
              className={`rounded-2xl shadow-lg p-6 flex flex-col transition-transform duration-300 hover:scale-[1.02] ${
                darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
              }`}
            >
              <img
                src={e.course?.image || "https://via.placeholder.com/400x200"}
                alt={e.course?.title}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{e.course?.title}</h2>
              <p className={`flex-grow mb-4 line-clamp-3 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {e.course?.description}
              </p>

              <div className={`flex justify-between text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <span>📘 Level: {e.course?.level}</span>
                <span>📂 {e.course?.category}</span>
              </div>

              <p className="text-xs text-gray-400 mb-3">
                Enrolled on: {new Date(e.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() =>
                    navigate(`/enrolled/${e.courseId}`, { state: { enrolledAt: e.createdAt } })
                  }
                  className="flex-1 bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-600 transition"
                >
                  👁 View
                </button>

                <button
                  onClick={() => handleUnenroll(e.id)}
                  className="flex-1 bg-red-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-red-600 transition"
                >
                  ❌ Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-center text-lg mt-10 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
          No enrolled courses found.
        </p>
      )}

      <div className="mt-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

export default EnrolledCourses;
