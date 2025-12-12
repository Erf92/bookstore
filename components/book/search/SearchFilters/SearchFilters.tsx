"use client";

import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";
import { FilterActions } from "./FilterActions";

export interface SearchFiltersType {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFilterChange: (updates: Partial<SearchFiltersType>) => void;
  onApply: () => void;
  onClear: () => void;
  isPending: boolean;
  availableCategories?: string[];
}

export function SearchFilters({
  filters,
  onFilterChange,
  onApply,
  onClear,
  isPending,
  availableCategories,
}: SearchFiltersProps) {
  const handleCategoryChange = (category?: string) => {
    onFilterChange({ category });
  };

  const handlePriceChange = (priceUpdates: {
    minPrice?: number;
    maxPrice?: number;
  }) => {
    onFilterChange(priceUpdates);
  };

  const handleRatingChange = (rating?: number) => {
    onFilterChange({ rating });
  };

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-xl shadow-lg p-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CategoryFilter
          category={filters.category}
          availableCategories={availableCategories}
          onCategoryChange={handleCategoryChange}
          disabled={isPending}
        />

        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onPriceChange={handlePriceChange}
          disabled={isPending}
        />

        <RatingFilter
          rating={filters.rating}
          onRatingChange={handleRatingChange}
          disabled={isPending}
        />

        <FilterActions
          onApply={onApply}
          onClear={onClear}
          disabled={isPending}
          pendingText="در حال اعمال..."
        />
      </div>
    </div>
  );
}
