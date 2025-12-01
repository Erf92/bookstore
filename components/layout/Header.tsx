"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            کتاب‌فروشی
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              خانه
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
