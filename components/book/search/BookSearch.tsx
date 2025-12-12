"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchInput } from "./SearchInput";
import {
  SearchFilters,
  SearchFiltersType,
} from "./SearchFilters/SearchFilters";
import { ActiveFilters } from "./ActiveFilters";

interface BookSearchProps {
  initialQuery?: string;
  initialFilters?: {
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
  };
  availableCategories?: string[];
}

export function BookSearch({
  initialQuery = "",
  initialFilters = {},
  availableCategories = [],
}: BookSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersType>({
    category: initialFilters.category || undefined,
    minPrice: initialFilters.minPrice
      ? parseInt(initialFilters.minPrice)
      : undefined,
    maxPrice: initialFilters.maxPrice
      ? parseInt(initialFilters.maxPrice)
      : undefined,
    rating: initialFilters.rating ? parseInt(initialFilters.rating) : undefined,
  });

  const applySearch = useCallback(() => {
    const params = new URLSearchParams();

    if (query.trim()) {
      params.set("q", query.trim());
    }

    if (filters.category && filters.category !== "همه") {
      params.set("category", filters.category);
    }

    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice.toString());
    }

    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice.toString());
    }

    if (filters.rating) {
      params.set("rating", filters.rating.toString());
    }

    const queryString = params.toString();

    router.replace(`/${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }, [query, filters, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applySearch();
  };

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setQuery("");
      setFilters({
        category: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        rating: undefined,
      });
    });
    router.replace("/");
  }, [router]);

  const hasActiveFilters = useCallback(() => {
    return (
      Object.values(filters).some((value) => value !== undefined) ||
      query.trim() !== ""
    );
  }, [filters, query]);

  const updateFilter = useCallback((updates: Partial<SearchFiltersType>) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, ...updates }));
    });
  }, []);

  const removeFilter = useCallback((key: keyof SearchFiltersType) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, [key]: undefined }));
    });
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    const urlCategory = searchParams.get("category") || "";

    if (
      urlQuery !== initialQuery ||
      urlCategory !== (initialFilters.category || "")
    ) {
      startTransition(() => {
        setQuery(urlQuery);

        const newFilters: SearchFiltersType = {
          category: searchParams.get("category") || undefined,
          minPrice: searchParams.get("minPrice")
            ? parseInt(searchParams.get("minPrice")!)
            : undefined,
          maxPrice: searchParams.get("maxPrice")
            ? parseInt(searchParams.get("maxPrice")!)
            : undefined,
          rating: searchParams.get("rating")
            ? parseInt(searchParams.get("rating")!)
            : undefined,
        };

        setFilters(newFilters);
      });
    }
  }, [searchParams, initialQuery, initialFilters.category]);

  useEffect(() => {
    if (query === initialQuery) return;

    const timer = setTimeout(() => {
      applySearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [query, initialQuery, applySearch]);

  useEffect(() => {
    if (!showFilters) return;

    const timer = setTimeout(() => {
      applySearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, showFilters, applySearch]);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <SearchInput
        query={query}
        setQuery={setQuery}
        hasActiveFilters={hasActiveFilters()}
        showFilters={showFilters}
        toggleFilters={toggleFilters}
        onSubmit={handleSubmit}
        onClear={clearFilters}
        isPending={isPending}
      />

      {showFilters && (
        <>
          <SearchFilters
            filters={filters}
            onFilterChange={updateFilter}
            onApply={applySearch}
            onClear={clearFilters}
            isPending={isPending}
            availableCategories={availableCategories}
          />
          <ActiveFilters
            filters={filters}
            onRemoveFilter={removeFilter}
            isPending={isPending}
          />
        </>
      )}
    </div>
  );
}
