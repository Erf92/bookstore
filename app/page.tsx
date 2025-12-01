export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        📚 کتاب‌فروشی آنلاین
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        به زودی بهترین کتاب‌ها در دسترس شما خواهد بود
      </p>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <p className="text-gray-700 mb-4">پروژه در حال توسعه است...</p>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.1s]"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        </div>
      </div>
    </div>
  );
}
