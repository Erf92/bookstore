import { Book } from "@/types/book";
import booksData from "@/data/books.mock.json";

export async function getBooks(): Promise<Book[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return booksData;
}

export async function getBook(id: number): Promise<Book | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const book = booksData.find((b) => b.id === id);
  return book || null;
}
