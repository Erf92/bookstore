import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import { Header } from "@/components/layout/Header";

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
      <body className="min-h-screen bg-gray-50">
        <CartProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
