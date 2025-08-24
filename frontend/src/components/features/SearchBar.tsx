import React from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSortToggle: () => void;
  sortOrder: "asc" | "desc";
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSortToggle,
  sortOrder,
  showAdvancedFilters,
  onToggleAdvancedFilters,
}) => {
  return (
    <div className="w-full px-4 py-2">
      <div className="flex items-center bg-white rounded-xl shadow-md px-3 py-2">
        <FiSearch className="text-gray-400 w-5 h-5 mr-2" />

        <input
          type="text"
          placeholder="Search or filter results"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
        />

        <button
          onClick={onSortToggle}
          className={`ml-2 p-2 rounded-lg transition-colors text-secondary-600 hover:bg-primary-100`}
          aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
        >
          {sortOrder === "asc" ? (
            <FaSortAlphaDown className="w-5 h-5" />
          ) : (
            <FaSortAlphaUp className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={onToggleAdvancedFilters}
          className={`ml-2 p-2 rounded-lg transition-colors ${
            showAdvancedFilters
              ? "bg-primary-100 text-primary-600"
              : "text-primary-600 hover:bg-primary-100"
          }`}
          aria-label="Toggle advanced filters"
        >
          <FiSliders className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};