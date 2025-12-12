import { getBooks } from "@/lib/api";
import { BookCard } from "@/components/book/BookCard";
import { BookSearch } from "@/components/book/search/BookSearch";
import { Search, Star } from "lucide-react";

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const allBooks = await getBooks();

  const availableCategories = Array.from(
    new Set(
      allBooks
        .map((book) => book.category)
        .filter((category): category is string => !!category)
    )
  );

  const filteredBooks = allBooks.filter((book) => {
    if (params.q) {
      const query = params.q.toLowerCase();

      const searchInTitle = book.title.toLowerCase().includes(query);
      const searchInAuthor = book.author.toLowerCase().includes(query);
      const searchInDescription = book.description
        .toLowerCase()
        .includes(query);
      const searchInCategory =
        book.category?.toLowerCase().includes(query) || false;

      if (
        !searchInTitle &&
        !searchInAuthor &&
        !searchInDescription &&
        !searchInCategory
      ) {
        return false;
      }
    }

    if (params.category && params.category !== "همه") {
      if (!book.category || book.category !== params.category) {
        return false;
      }
    }

    if (params.minPrice) {
      const minPrice = parseInt(params.minPrice);
      if (isNaN(minPrice) || book.price < minPrice) {
        return false;
      }
    }

    if (params.maxPrice) {
      const maxPrice = parseInt(params.maxPrice);
      if (isNaN(maxPrice) || book.price > maxPrice) {
        return false;
      }
    }

    if (params.rating) {
      const minRating = parseInt(params.rating);
      if (isNaN(minRating) || !book.rating || book.rating < minRating) {
        return false;
      }
    }

    return true;
  });

  const hasRatingFilter = !!params.rating;
  const noResultsWithRating = hasRatingFilter && filteredBooks.length === 0;

  const getAlternativeBooks = () => {
    if (!params.rating || isNaN(parseInt(params.rating))) return [];

    const targetRating = parseInt(params.rating);

    return allBooks
      .filter((book) => book.rating && book.rating >= targetRating - 0.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  };

  const alternativeBooks = noResultsWithRating ? getAlternativeBooks() : [];

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
        <BookSearch
          initialQuery={params.q}
          initialFilters={params}
          availableCategories={availableCategories}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {params.q
              ? `نتایج جستجو برای "${params.q}"`
              : params.category && params.category !== "همه"
              ? `کتاب‌های دسته "${params.category}"`
              : params.rating
              ? `کتاب‌های با امتیاز ${params.rating}+`
              : "کتاب‌های پیشنهادی"}
          </h2>
          <span className="text-gray-600">
            {filteredBooks.length} کتاب پیدا شد
          </span>
        </div>

        {noResultsWithRating && alternativeBooks.length > 0 ? (
          <div>
            <div className="text-center py-8 mb-8 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                کتابی با امتیاز {params.rating}+ یافت نشد
              </h3>
              <p className="text-gray-600 mb-4">
                اما این کتاب‌های با امتیاز بالا را مشاهده کنید:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
                {alternativeBooks.map((book) => (
                  <div
                    key={book.id}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900">
                        {book.rating?.toFixed(1)}
                      </span>
                      <span className="text-gray-500 text-sm">امتیاز</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {book.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                    <button
                      onClick={() =>
                        (window.location.href = `/books/${book.id}`)
                      }
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                    >
                      مشاهده کتاب
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  (window.location.href = `/?rating=${
                    parseInt(params.rating!) - 1
                  }`)
                }
                className="mt-6 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg transition-colors"
              >
                نمایش کتاب‌های با امتیاز {parseInt(params.rating!) - 1}+
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                سایر کتاب‌های پیشنهادی
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allBooks
                  .filter(
                    (book) => !filteredBooks.some((fb) => fb.id === book.id)
                  )
                  .slice(0, 4)
                  .map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
              </div>
            </div>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {Object.keys(params).length > 0
                ? "کتابی یافت نشد"
                : "هیچ کتابی وجود ندارد"}
            </h3>
            <p className="text-gray-600">
              {Object.keys(params).length > 0
                ? "متأسفانه هیچ کتابی با معیارهای جستجوی شما مطابقت ندارد."
                : "به زودی کتاب‌های جدید اضافه خواهند شد."}
            </p>
            {Object.keys(params).length > 0 && (
              <button
                onClick={() => (window.location.href = "/")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                حذف فیلترها
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
