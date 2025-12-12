"use client";

import { useTransition } from "react";
import { Star } from "lucide-react";

interface RatingFilterProps {
  rating?: number;
  onRatingChange: (rating?: number) => void;
  disabled?: boolean;
}

export function RatingFilter({
  rating,
  onRatingChange,
  disabled = false,
}: RatingFilterProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (star: number) => {
    startTransition(() => {
      onRatingChange(rating === star ? undefined : star);
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        حداقل امتیاز
      </label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            disabled={disabled || isPending}
            className={`p-2 rounded-lg transition-colors ${
              rating && star <= rating
                ? "bg-yellow-100 text-yellow-600"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
            } ${
              disabled || isPending
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
            aria-label={`امتیاز ${star} ستاره`}
          >
            <Star
              className={`w-5 h-5 ${
                rating && star <= rating ? "fill-current" : ""
              }`}
            />
          </button>
        ))}
      </div>
      {rating && (
        <p className="text-xs text-gray-500 mt-2">
          کتاب‌های با امتیاز {rating}+
        </p>
      )}
    </div>
  );
}
