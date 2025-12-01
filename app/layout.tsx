import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "کتاب‌فروشی آنلاین",
  description: "خرید آنلاین کتاب با بهترین قیمت",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
