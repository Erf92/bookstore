"use client";

import { useState, useEffect, useRef, useTransition } from "react";

interface PriceFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onPriceChange: (updates: { minPrice?: number; maxPrice?: number }) => void;
  disabled?: boolean;
}

export function PriceFilter({
  minPrice,
  maxPrice,
  onPriceChange,
  disabled = false,
}: PriceFilterProps) {
  const [isPending, startTransition] = useTransition();
  const [tempMinPrice, setTempMinPrice] = useState<string>(
    minPrice?.toString() || ""
  );
  const [tempMaxPrice, setTempMaxPrice] = useState<string>(
    maxPrice?.toString() || ""
  );

  const minPriceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const maxPriceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    startTransition(() => {
      setTempMinPrice(minPrice?.toString() || "");
      setTempMaxPrice(maxPrice?.toString() || "");
    });
  }, [minPrice, maxPrice]);

  useEffect(() => {
    return () => {
      if (minPriceTimerRef.current) clearTimeout(minPriceTimerRef.current);
      if (maxPriceTimerRef.current) clearTimeout(maxPriceTimerRef.current);
    };
  }, []);

  const handleMinPriceChange = (value: string) => {
    setTempMinPrice(value);

    if (minPriceTimerRef.current) {
      clearTimeout(minPriceTimerRef.current);
      minPriceTimerRef.current = undefined;
    }

    if (value === "") {
      startTransition(() => {
        onPriceChange({ minPrice: undefined });
      });
      return;
    }

    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      minPriceTimerRef.current = setTimeout(() => {
        startTransition(() => {
          onPriceChange({ minPrice: numValue });
        });
      }, 1200);
    }
  };

  const handleMaxPriceChange = (value: string) => {
    setTempMaxPrice(value);

    if (maxPriceTimerRef.current) {
      clearTimeout(maxPriceTimerRef.current);
      maxPriceTimerRef.current = undefined;
    }

    if (value === "") {
      startTransition(() => {
        onPriceChange({ maxPrice: undefined });
      });
      return;
    }

    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      maxPriceTimerRef.current = setTimeout(() => {
        startTransition(() => {
          onPriceChange({ maxPrice: numValue });
        });
      }, 1200);
    }
  };

  const handlePriceBlur = (type: "min" | "max") => {
    if (type === "min" && minPriceTimerRef.current) {
      clearTimeout(minPriceTimerRef.current);
      minPriceTimerRef.current = undefined;
    } else if (type === "max" && maxPriceTimerRef.current) {
      clearTimeout(maxPriceTimerRef.current);
      maxPriceTimerRef.current = undefined;
    }

    if (type === "min") {
      if (tempMinPrice && !isNaN(parseInt(tempMinPrice))) {
        startTransition(() => {
          onPriceChange({ minPrice: parseInt(tempMinPrice) });
        });
      }
    } else {
      if (tempMaxPrice && !isNaN(parseInt(tempMaxPrice))) {
        startTransition(() => {
          onPriceChange({ maxPrice: parseInt(tempMaxPrice) });
        });
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        محدوده قیمت (تومان)
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="حداقل"
          value={tempMinPrice}
          onChange={(e) => handleMinPriceChange(e.target.value)}
          onBlur={() => handlePriceBlur("min")}
          className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={disabled || isPending}
          min="0"
          step="1000"
        />
        <input
          type="number"
          placeholder="حداکثر"
          value={tempMaxPrice}
          onChange={(e) => handleMaxPriceChange(e.target.value)}
          onBlur={() => handlePriceBlur("max")}
          className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={disabled || isPending}
          min="0"
          step="1000"
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        بعد از توقف تایپ، فیلتر اعمال می‌شود
      </p>
    </div>
  );
}
