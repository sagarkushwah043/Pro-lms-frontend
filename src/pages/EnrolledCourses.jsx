import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import api from "../api/axios";

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
      (title.includes(filters.search.toLowerCase()) ||
        desc.includes(filters.search.toLowerCase())) &&
      (filters.category ? e.course?.category === filters.category : true) &&
      (filters.level ? e.course?.level === filters.level : true)
    );
  });

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Better Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute w-full h-full border-4 border-b-transparent border-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        My Enrolled Courses
      </h1>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filtered.map((e) => (
            <div
              key={e.id}
              className={`p-5 rounded-xl shadow-md transition transform hover:scale-[1.02] ${
                darkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {/* Course Image */}
              <img
                src={e.course?.image || "https://via.placeholder.com/400x200"}
                alt={e.course?.title}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />

              {/* Title */}
              <h2 className="text-lg font-semibold mb-2">
                {e.course?.title}
              </h2>

              {/* Description */}
              <p className="text-sm mb-3 text-gray-500 line-clamp-3">
                {e.course?.description}
              </p>

              {/* Meta */}
              <div className="flex justify-between text-xs mb-2 text-gray-400">
                <span>📘 {e.course?.level}</span>
                <span>📂 {e.course?.category}</span>
              </div>

              {/* Enrolled Date */}
              <p className="text-xs mb-4 text-gray-400">
                Enrolled: {new Date(e.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/enrolled/${e.courseId}`, {
                      state: { enrolledAt: e.createdAt },
                    })
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition"
                >
                  View
                </button>

                <button
                  onClick={() => handleUnenroll(e.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition"
                >
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm mt-12">
          You haven’t enrolled in any courses yet.
        </p>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

export default EnrolledCourses;
