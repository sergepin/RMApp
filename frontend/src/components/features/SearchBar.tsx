import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSortToggle: () => void;
  sortOrder: 'asc' | 'desc';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSortToggle,
  sortOrder
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Search or filter results"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          />
        </div>
        <button
          onClick={onSortToggle}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        >
          {sortOrder === 'asc' ? '↓' : '↑'}
        </button>
      </div>
    </div>
  );
};