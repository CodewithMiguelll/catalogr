"use client";

import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/api";
import { Book } from "@/lib/types";
import BooksDashboard from "@/components/books-dashboard";
import AddBookDialog from "@/components/dialog";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, isLoading, error } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]);

  const addBook = (book: Book) => {
    setBooks((prev) => [book, ...prev]);
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const startEdit = (book: Book) => {
    setEditingBook(book);
    setOpen(true);
  };


  const onEditBook = (book: Book) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === book.id ? book : b))
    );
  };


  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <SideBar />
      </div>

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-2.5 md:mb-4">
            Welcome to Catalogr
          </h1>
          <p className="text-muted-foreground mb-4">
            Manage your books, genres, and more.
          </p>

          {isLoading && <p>Loading books...</p>}
          {error && <p>Something went wrong.</p>}

          <BooksDashboard
            books={books}
            onDeleteBook={deleteBook}
            onEditBook={startEdit}
          />

          <AddBookDialog
            open={open}
            onOpenChange={(open) => {
              if (!open) setEditingBook(null);
              setOpen(open);
            }}
            onAddBook={addBook}
            onUpdateBook={onEditBook}
            editingBook={editingBook}
          />
        </main>
      </div>
    </div>
  );
}
