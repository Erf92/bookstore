"use client";

import { useTransition } from "react";

interface CategoryFilterProps {
  category?: string;
  availableCategories?: string[];
  onCategoryChange: (category?: string) => void;
  disabled?: boolean;
}

export function CategoryFilter({
  category,
  availableCategories = [],
  onCategoryChange,
  disabled = false,
}: CategoryFilterProps) {
  const [isPending, startTransition] = useTransition();

  const categories = ["همه", ...availableCategories];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      onCategoryChange(e.target.value === "همه" ? undefined : e.target.value);
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        دسته‌بندی
      </label>
      <select
        value={category || "همه"}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={disabled || isPending}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
