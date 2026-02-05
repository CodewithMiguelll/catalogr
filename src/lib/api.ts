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

  // Checking for 
  data.forEach((book: any, index: number) => {
    console.log(index, book.title, book.createdAt);
  });



  return data
  .filter(Boolean) 
  .map((book: any) => {
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
