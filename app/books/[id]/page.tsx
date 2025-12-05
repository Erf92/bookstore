import { notFound } from "next/navigation";
import { BookDetails } from "@/components/book/BookDetails";
import { getBook } from "@/lib/api";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const bookId = parseInt(id);

  if (isNaN(bookId)) {
    notFound();
  }

  const book = await getBook(bookId);

  if (!book) {
    notFound();
  }

  return <BookDetails book={book} />;
}
