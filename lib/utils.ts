import booksData from "@/data/books.mock.json";
import { getBooks } from "./api";

export function getUniqueCategories(): string[] {
  const categories = new Set<string>();
  booksData.forEach((book) => {
    if (book.category) {
      categories.add(book.category);
    }
  });
  return Array.from(categories);
}

export async function getAvailableCategories(): Promise<string[]> {
  const books = await getBooks();
  const categories = new Set<string>();
  books.forEach((book) => {
    if (book.category) {
      categories.add(book.category);
    }
  });
  return Array.from(categories);
}
