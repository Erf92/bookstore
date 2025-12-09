import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
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
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
