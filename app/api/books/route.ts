import { NextResponse } from "next/server";
import books from "@/data/books.mock.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return NextResponse.json(books);
}
