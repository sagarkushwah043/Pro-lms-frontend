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
      className={`flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl shadow-sm transition-all 
        ${darkMode ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"}
      `}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`px-3 py-2 rounded-lg border text-sm w-full sm:w-1/3 transition-all
          focus:ring-2 focus:ring-teal-500 focus:outline-none
          ${darkMode 
            ? "bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-400" 
            : "bg-gray-50 text-gray-900 border-gray-300 placeholder-gray-500"}
        `}
      />

      {/* Level */}
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className={`px-3 py-2 rounded-lg border text-sm transition-all
          focus:ring-2 focus:ring-teal-500 focus:outline-none
          ${darkMode 
            ? "bg-gray-800 text-gray-200 border-gray-600" 
            : "bg-gray-50 text-gray-900 border-gray-300"}
        `}
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
        className={`px-3 py-2 rounded-lg border text-sm transition-all
          focus:ring-2 focus:ring-teal-500 focus:outline-none
          ${darkMode 
            ? "bg-gray-800 text-gray-200 border-gray-600" 
            : "bg-gray-50 text-gray-900 border-gray-300"}
        `}
      >
        <option value="">All Categories</option>
        <option value="programming">Programming</option>
        <option value="design">Design</option>
        <option value="data science">Data Science</option>
        <option value="database">Database</option>
        <option value="devops">DevOps</option>
        <option value="web development">Web Development</option>
      </select>

      {/* Apply Button */}
      <button
        type="submit"
        className={`px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-all
          hover:opacity-90 active:scale-95
          ${darkMode 
            ? "bg-teal-600 text-white" 
            : "bg-gradient-to-r from-teal-500 to-teal-600 text-white"}
        `}
      >
        Apply
      </button>
    </form>
  );
};

export default FilterBar;
