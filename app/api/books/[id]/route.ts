import { NextRequest, NextResponse } from "next/server";
import books from "@/data/books.mock.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookId = parseInt(id);

    if (isNaN(bookId)) {
      return NextResponse.json(
        { error: "شناسه کتاب نامعتبر است" },
        { status: 400 }
      );
    }

    const book = books.find((b) => b.id === bookId);

    if (!book) {
      return NextResponse.json({ error: "کتاب یافت نشد" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
