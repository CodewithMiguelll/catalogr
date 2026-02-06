import { Book } from "./types";

const API_URL = "https://api.json-generator.com/templates/gWZYGIbf7M-q/data";
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();

  return data.filter(Boolean).map((book: any) => {
    const parsedDate = Date.parse(book.createdAt);

    return {
      ...book,
      price: Number(book.price) || 0,
      stock: Number(book.stock) || 0,
      createdAt: Number.isNaN(parsedDate)
        ? new Date().toISOString()
        : new Date(parsedDate).toISOString(),
    };
  });
}


export async function fetchBookById(id: string): Promise<Book> {
  // 1. Get all books
  const books = await fetchBooks();

  // 2. FIX: Convert book.id to String() so it matches the URL id
  // "101" (string) will now match 101 (number)
  const book = books.find((book) => String(book.id) === id);

  // 3. FIX: Throw an error if not found (Stops React Query from crashing)
  if (!book) {
    throw new Error("Book not found");
  }

  return book;
}
