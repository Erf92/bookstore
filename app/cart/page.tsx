"use client";

import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, itemCount, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            سبد خرید شما خالی است
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            کتاب‌های مورد علاقه خود را به سبد خرید اضافه کنید و از تخفیف‌های
            ویژه بهره‌مند شوید.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors text-lg font-medium"
          >
            <ArrowRight className="w-5 h-5" />
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  const formattedTotal = total.toLocaleString("fa-IR");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            سبد خرید شما
          </h1>
          <p className="text-gray-600">
            {itemCount} کتاب در سبد خرید شما وجود دارد
          </p>
        </div>

        <div className="lg:flex gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="sm:w-24 sm:h-32 w-full h-48 relative shrink-0">
                    <Image
                      src={item.book.cover}
                      alt={item.book.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="grow">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/books/${item.book.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {item.book.title}
                        </Link>
                        <p className="text-gray-600 mt-1">
                          نویسنده: {item.book.author}
                        </p>
                        <div className="mt-2">
                          <span className="text-xl font-bold text-green-600">
                            {item.book.price.toLocaleString("fa-IR")} تومان
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.qty - 1)
                            }
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="کاهش تعداد"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.qty + 1)
                            }
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="افزایش تعداد"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors p-2"
                          aria-label="حذف از سبد خرید"
                        >
                          <Trash2 className="w-5 h-5" />
                          <span className="hidden sm:inline">حذف</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">جمع این آیتم:</span>
                        <span className="text-xl font-bold text-gray-900">
                          {(item.book.price * item.qty).toLocaleString("fa-IR")}{" "}
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors p-3"
              >
                <Trash2 className="w-5 h-5" />
                پاک کردن تمام سبد خرید
              </button>
            </div>
          </div>

          {/* خلاصه سفارش */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                خلاصه سفارش
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>تعداد کتاب‌ها:</span>
                  <span className="font-medium">{itemCount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>قیمت کل:</span>
                  <span className="font-medium">{formattedTotal} تومان</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>هزینه ارسال:</span>
                  <span className="font-medium text-green-600">رایگان</span>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>مبلغ قابل پرداخت:</span>
                    <span>{formattedTotal} تومان</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert("در حال انتقال به درگاه پرداخت...")}
                className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl text-lg font-bold mt-8 transition-all hover:shadow-lg"
              >
                ادامه جهت پرداخت
              </button>

              <Link
                href="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg mt-4 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                ادامه خرید
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
