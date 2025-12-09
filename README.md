# 📚 کتاب‌فروشی آنلاین

یک پروژه فروشگاه کتاب مدرن ساخته شده با Next.js 16، React 19 و TypeScript

## 🚀 ویژگی‌های پروژه

- ✅ صفحه اصلی با لیست کتاب‌ها
- ✅ جستجوی کتاب‌ها
- ✅ صفحه جزئیات کتاب
- ✅ سبد خرید کامل
- ✅ صفحات ورود و ثبت‌نام (فیک)
- ✅ طراحی واکنش‌گرا و مدرن
- ✅ مدیریت state با Context API
- ✅ ذخیره‌سازی در localStorage

## 🛠️ تکنولوژی‌ها

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **State Management:** React Context API
- **Icons:** Lucide React
- **Data:** Local JSON (Mock)

## 📁 ساختار پروژه

bookstore/
├── app/ # App Router
│ ├── (auth)/ # صفحات احراز هویت
│ ├── books/[id]/ # صفحه جزئیات کتاب
│ ├── cart/ # صفحه سبد خرید
│ ├── api/ # API Routes
│ └── layout & pages
├── components/ # کامپوننت‌های قابل استفاده
├── context/ # Context های React
├── data/ # داده‌های Mock
├── lib/ # توابع کمکی
├── public/ # فایل‌های استاتیک
└── types/ # TypeScript Types

## 🚀 شروع

1. کلون پروژه:

```bash
git clone [repository-url]
cd bookstore

2. نصب وابستگی‌ها:
npm install

3. اجرای پروژه:
npm run dev

4. بازکردن در مرورگر:
http://localhost:3000

🎯 ویژگی‌های فنی

SSR/SSG: با Next.js App Router

Type Safety: کامل با TypeScript

Responsive Design: با TailwindCSS

State Persistence: با localStorage

Error Handling: با Error Boundaries

Loading States: با Suspense

## 🖼️ صفحات پروژه

| صفحه اصلی | سبد خرید | جزئیات کتاب |
|-----------|----------|-------------|
| ![صفحه اصلی](/screenshots/home.png) | ![سبد خرید](/screenshots/cart.png) | ![جزئیات کتاب](/screenshots/book-details.png) |

| ورود | ثبت‌نام |
|------|---------|
| ![ورود](/screenshots/login.png) | ![ثبت‌نام](/screenshots/register.png) |
```
