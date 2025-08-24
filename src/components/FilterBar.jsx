import React, { useState, useEffect } from "react";
import { useTheme } from "../Context/ThemeContext";

const FilterBar = ({ filters, onFilterChange }) => {
  const { darkMode } = useTheme();

  const [search, setSearch] = useState(filters.search || "");
  const [level, setLevel] = useState(filters.level || "");
  const [category, setCategory] = useState(filters.category || "");

  useEffect(() => {
    setSearch(filters.search || "");
    setLevel(filters.level || "");
    setCategory(filters.category || "");
  }, [filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange({ search, level, category });
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-2xl shadow-lg border transition-transform transform hover:-translate-y-1 duration-300 ${
        darkMode
          ? "bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700"
          : "bg-gradient-to-r from-teal-50 to-blue-50 border-gray-200"
      }`}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`px-3 py-2 sm:py-1 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full sm:w-1/3 transition ${
          darkMode
            ? "bg-gray-700 text-gray-200 border-gray-600"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      />

      {/* Level */}
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className={`px-3 py-2 sm:py-1 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
          darkMode
            ? "bg-gray-700 text-gray-200 border-gray-600"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      >
        <option value="">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={`px-3 py-2 sm:py-1 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition ${
          darkMode
            ? "bg-gray-700 text-gray-200 border-gray-600"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      >
        <option value="">All Categories</option>
        <option value="programming">Programming</option>
        <option value="design">Design</option>
        <option value="marketing">Marketing</option>
      </select>

      {/* Apply Button */}
      <button
        type="submit"
        className={`px-5 py-2 sm:py-1 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300 w-full sm:w-auto text-sm font-medium ${
          darkMode
            ? "bg-gradient-to-r from-teal-700 to-blue-800 text-white"
            : "bg-gradient-to-r from-teal-500 to-blue-600 text-white"
        }`}
      >
        Apply
      </button>
    </form>
  );
};

export default FilterBar;
