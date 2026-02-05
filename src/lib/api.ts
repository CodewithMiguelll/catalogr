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

  return data.map((book: any) => ({
    ...book,
    stock: Number(book.stock) || 0,
    price: Number(book.price) || 0,
  }));
}
