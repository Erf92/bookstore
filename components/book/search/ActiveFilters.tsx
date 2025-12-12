"use client";

import { SearchFiltersType } from "./SearchFilters/SearchFilters";

interface ActiveFiltersProps {
  filters: SearchFiltersType;
  onRemoveFilter: (key: keyof SearchFiltersType) => void;
  isPending: boolean;
}

export function ActiveFilters({
  filters,
  onRemoveFilter,
  isPending,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    filters.category || filters.minPrice || filters.maxPrice || filters.rating;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="mt-6 pt-6 border-t">
      <h4 className="text-sm font-medium text-gray-700 mb-3">فیلترهای فعال:</h4>
      <div className="flex flex-wrap gap-2">
        {filters.category && filters.category !== "همه" && (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            دسته: {filters.category}
            <button
              onClick={() => onRemoveFilter("category")}
              className="text-blue-500 hover:text-blue-700"
              disabled={isPending}
              aria-label="حذف فیلتر دسته‌بندی"
            >
              ×
            </button>
          </span>
        )}
        {filters.minPrice && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            از {filters.minPrice.toLocaleString()} تومان
            <button
              onClick={() => onRemoveFilter("minPrice")}
              className="text-green-500 hover:text-green-700"
              disabled={isPending}
              aria-label="حذف فیلتر حداقل قیمت"
            >
              ×
            </button>
          </span>
        )}
        {filters.maxPrice && (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            تا {filters.maxPrice.toLocaleString()} تومان
            <button
              onClick={() => onRemoveFilter("maxPrice")}
              className="text-green-500 hover:text-green-700"
              disabled={isPending}
              aria-label="حذف فیلتر حداکثر قیمت"
            >
              ×
            </button>
          </span>
        )}
        {filters.rating && (
          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            امتیاز: {filters.rating}+
            <button
              onClick={() => onRemoveFilter("rating")}
              className="text-yellow-500 hover:text-yellow-700"
              disabled={isPending}
              aria-label="حذف فیلتر امتیاز"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
