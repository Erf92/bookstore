"use client";

import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/book";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

        <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {book.price.toLocaleString("fa-IR")} تومان
        </div>
      </div>

      <div className="p-5">
        <Link href={`/books/${book.id}`}>
          <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
            {book.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3">نویسنده: {book.author}</p>

        {book.category && (
          <span className="inline-block bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full mb-4">
            {book.category}
          </span>
        )}

        {book.rating && (
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(book.rating))}
              {"☆".repeat(5 - Math.floor(book.rating))}
            </div>
            <span className="text-sm text-gray-500 mr-2">
              ({book.rating.toFixed(1)})
            </span>
          </div>
        )}

        <div className="flex gap-2">
          <Link
            href={`/books/${book.id}`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-center transition-colors text-sm"
          >
            مشاهده جزئیات
          </Link>

          <button
            onClick={() => addToCart(book)}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            خرید
          </button>
        </div>
      </div>
    </div>
  );
}
