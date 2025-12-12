"use client";

import { Search, X, Filter } from "lucide-react";
import { useTransition } from "react";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  hasActiveFilters: boolean;
  showFilters: boolean;
  toggleFilters: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
  isPending: boolean;
}

export function SearchInput({
  query,
  setQuery,
  hasActiveFilters,
  toggleFilters,
  onSubmit,
  onClear,
  isPending,
}: SearchInputProps) {
  const [, startTransition] = useTransition();

  return (
    <div className="relative">
      <form onSubmit={onSubmit}>
        <div className="relative">
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="w-6 h-6" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی کتاب بر اساس عنوان، نویسنده، موضوع..."
            className="w-full px-6 py-4 pr-12 pl-36 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
            disabled={isPending}
          />

          {isPending && (
            <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            </div>
          )}

          {hasActiveFilters && !isPending && (
            <button
              type="button"
              onClick={onClear}
              className="absolute left-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors z-10"
              aria-label="پاک کردن جستجو"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => startTransition(toggleFilters)}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 px-3 py-2 rounded-lg transition-all z-10 ${
              hasActiveFilters
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isPending}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">فیلترها</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
