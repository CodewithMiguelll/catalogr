"use client";

import Header from "@/components/header";
import SideBar from "@/components/sidebar";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/lib/api";
import { Book } from "@/lib/types";
import BooksDashboard from "@/components/books-dashboard";

export default function Home() {
  const { data, isLoading, error } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  

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

          {data && <BooksDashboard books={data} />}
        </main>
      </div>
    </div>
  );
}
