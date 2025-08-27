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
      className={`flex flex-col sm:flex-row gap-2 p-3 border rounded-md ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
      }`}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`px-2 py-1 rounded border text-sm w-full sm:w-1/3 ${
          darkMode
            ? "bg-gray-700 text-gray-200 border-gray-600"
            : "bg-white text-gray-900 border-gray-300"
        }`}
      />

      {/* Level */}
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className={`px-2 py-1 rounded border text-sm ${
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
        className={`px-2 py-1 rounded border text-sm ${
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
        className={`px-4 py-1 rounded text-sm font-medium ${
          darkMode
            ? "bg-teal-700 text-white"
            : "bg-teal-500 text-white"
        }`}
      >
        Apply
      </button>
    </form>
  );
};

export default FilterBar;
