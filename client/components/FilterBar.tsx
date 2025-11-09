import React from "react";
import { Search, X } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
  onSearch?: (query: string) => void;
  onReset: () => void;
  searchQuery?: string;
  filterConfigs: FilterConfig[];
  showSearch?: boolean;
}

export default function FilterBar({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  searchQuery = "",
  filterConfigs,
  showSearch = true,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
      {/* Search Bar */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      )}

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filterConfigs.map((config) => (
          <div key={config.id}>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
              {config.label}
            </label>
            <select
              value={filters[config.id] || ""}
              onChange={(e) => onFilterChange(config.id, e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all text-sm"
            >
              <option value="">{config.placeholder}</option>
              {config.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all duration-200 font-medium text-sm"
        >
          <X className="w-4 h-4" />
          Clear Filters
        </button>
      </div>
    </div>
  );
}
