import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="text-gray-600 mt-2 mb-8">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
