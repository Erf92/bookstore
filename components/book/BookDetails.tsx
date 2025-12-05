"use client";

import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/book";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";

interface BookDetailsProps {
  book: Book;
}

export function BookDetails({ book }: BookDetailsProps) {
  const { addToCart, items } = useCart();
  const cartItem = items.find((item) => item.id === book.id);
  const inCart = Boolean(cartItem);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="flex items-center text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">
          خانه
        </Link>
        <ArrowLeft className="w-4 h-4 mx-2" />
        <span className="text-gray-900 font-medium">{book.title}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-8">
            <div className="relative aspect-3/4 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:w-2/3 p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600">نویسنده: {book.author}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {book.rating && (
                <div className="flex items-center bg-yellow-50 gap-1 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold text-gray-900 mr-1">
                    {book.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-600">از 5</span>
                </div>
              )}

              {book.category && (
                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm">
                  {book.category}
                </span>
              )}
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {book.price.toLocaleString("fa-IR")} تومان
              </div>
              {inCart && (
                <div className="text-sm text-blue-600">
                  {cartItem!.qty} عدد در سبد خرید شما موجود است
                </div>
              )}
            </div>

            <div className="mb-8">
              <button
                onClick={() => addToCart(book)}
                className="flex items-center justify-center gap-3 w-full md:w-auto bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-8 rounded-xl text-lg font-bold transition-all hover:shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                {inCart ? "افزودن مجدد به سبد" : "افزودن به سبد خرید"}
              </button>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                درباره کتاب
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
