import { getBooks } from "@/lib/api";
import { BookCard } from "@/components/book/BookCard";
import { BookSearch } from "@/components/book/‌BookSearch";

export default async function Home() {
  const books = await getBooks();

  return (
    <div className="min-h-screen">
      <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            کتاب‌فروشی آنلاین
          </h1>
          <p className="text-xl text-center opacity-90">
            بهترین کتاب‌ها را با بهترین قیمت بخرید
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-8">
        <BookSearch />
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          کتاب‌های پیشنهادی
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
