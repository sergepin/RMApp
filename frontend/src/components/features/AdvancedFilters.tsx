import React from "react";

interface AdvancedFiltersProps {
  filters: {
    status: string;
    species: string;
    gender: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: () => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  showAdvancedFilters,
  onToggleAdvancedFilters,
}) => {
  const statusOptions = ["", "Alive", "Dead", "Unknown"];
  const speciesOptions = [
    "",
    "Human", 
    "Alien",
    "Humanoid",
    "Robot",
    "Animal",
    "Disease",
    "Cronenberg",
    "Mythological Creature",
    "Poopybutthole",
  ];
  const genderOptions = ["", "Male", "Female", "Genderless", "Unknown"];

  const hasActiveFilters = filters.status || filters.species || filters.gender;

  const getButtonClasses = (isActive: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-purple-100 text-purple-600"
        : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
    }`;

  const getMobileButtonClasses = (isActive: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive
        ? "bg-purple-500 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <>
      <div className="hidden md:block mt-2 w-full bg-white shadow-lg rounded-xl p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">Advanced Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Status</p>
          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => onFilterChange("status", status)}
                className={getButtonClasses(filters.status === status)}
              >
                {status || "All"}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Species</p>
          <div className="flex gap-2 flex-wrap">
            {speciesOptions.slice(0, 3).map((species) => (
              <button
                key={species}
                onClick={() => onFilterChange("species", species)}
                className={getButtonClasses(filters.species === species)}
              >
                {species || "All"}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Gender</p>
          <div className="flex gap-2 flex-wrap">
            {genderOptions.map((gender) => (
              <button
                key={gender}
                onClick={() => onFilterChange("gender", gender)}
                className={getButtonClasses(filters.gender === gender)}
              >
                {gender || "All"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end">
          <div 
            className="absolute inset-0"
            style={{ 
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0, 0, 0, 0.1)' 
            }}
            onClick={onToggleAdvancedFilters}
          ></div>
          <div className="bg-white w-full max-h-[80vh] overflow-y-auto rounded-t-2xl animate-slide-up relative z-10">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button
                onClick={onToggleAdvancedFilters}
                className="text-purple-600 font-medium"
              >
                ← Back
              </button>
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              <div className="w-12"></div>
            </div>

            <div className="p-4">
              {hasActiveFilters && (
                <div className="mb-4 text-right">
                  <button
                    onClick={onClearFilters}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Status</h3>
                <div className="flex gap-2 flex-wrap">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => onFilterChange("status", status)}
                      className={getMobileButtonClasses(filters.status === status)}
                    >
                      {status || "All"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Species</h3>
                <div className="flex gap-2 flex-wrap">
                  {speciesOptions.slice(0, 3).map((species) => (
                    <button
                      key={species}
                      onClick={() => onFilterChange("species", species)}
                      className={getMobileButtonClasses(filters.species === species)}
                    >
                      {species || "All"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Gender</h3>
                <div className="flex gap-2 flex-wrap">
                  {genderOptions.map((gender) => (
                    <button
                      key={gender}
                      onClick={() => onFilterChange("gender", gender)}
                      className={getMobileButtonClasses(filters.gender === gender)}
                    >
                      {gender || "All"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pb-4">
                <button 
                  className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
                  onClick={onToggleAdvancedFilters}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};