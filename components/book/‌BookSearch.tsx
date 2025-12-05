"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export function BookSearch() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // بعداً پیاده‌سازی می‌شه
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجوی کتاب بر اساس عنوان، نویسنده یا موضوع..."
          className="w-full px-6 py-4 pr-12 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}
