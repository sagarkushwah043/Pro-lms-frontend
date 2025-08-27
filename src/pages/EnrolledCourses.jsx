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
      (title.includes(filters.search.toLowerCase()) || desc.includes(filters.search.toLowerCase())) &&
      (filters.category ? e.course?.category === filters.category : true) &&
      (filters.level ? e.course?.level === filters.level : true)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <h1 className="text-2xl font-semibold text-center mb-4">My Enrolled Courses</h1>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filtered.map((e) => (
            <div
              key={e.id}
              className={`p-4 border rounded-lg ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}
            >
              <img
                src={e.course?.image || "https://via.placeholder.com/400x200"}
                alt={e.course?.title}
                className="rounded-md w-full h-36 object-cover mb-3"
              />
              <h2 className="text-lg font-medium mb-2">{e.course?.title}</h2>
              <p className="text-sm mb-3 line-clamp-3">{e.course?.description}</p>

              <div className="flex justify-between text-xs mb-2">
                <span>Level: {e.course?.level}</span>
                <span>{e.course?.category}</span>
              </div>

              <p className="text-xs mb-3 text-gray-500">
                Enrolled: {new Date(e.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/enrolled/${e.courseId}`, { state: { enrolledAt: e.createdAt } })}
                  className="flex-1 bg-blue-500 text-white text-sm py-1 rounded"
                >
                  View
                </button>

                <button
                  onClick={() => handleUnenroll(e.id)}
                  className="flex-1 bg-red-500 text-white text-sm py-1 rounded"
                >
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm mt-10">No enrolled courses found.</p>
      )}

      <div className="mt-6 flex justify-center">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}

export default EnrolledCourses;
