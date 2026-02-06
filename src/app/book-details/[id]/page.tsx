"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBookById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/header"; // Hook to get the ID
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SideBar from "@/components/sidebar";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();

  // 1. Get the ID from the URL (e.g. /books/123 -> id is "123")
  const id = params.id as string;

  // 2. Fetch the specific book
  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
  });

  if (isLoading) return <div className="p-10">Loading book details...</div>;

  // Handle case where ID doesn't exist in the API list
  if (error || !book)
    return (
      <div className="p-10 flex flex-col items-start gap-4">
        <h2 className="text-xl font-bold text-red-500">Book not found</h2>
        <p className="text-muted-foreground">
          This book might have been deleted or is a newly added local book.
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Navigation */}
        <Button
          variant="ghost"
          className="pl-0 hover:pl-2 transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        {/* Header Section */}
        <div className="border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground font-medium">
            {book.author}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs uppercase text-gray-500 font-bold mb-1">
              Price
            </p>
            <p className="text-2xl font-semibold text-green-600">
              ${book.price.toFixed(2)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs uppercase text-gray-500 font-bold mb-1">
              Stock Status
            </p>
            <p
              className={`text-2xl font-semibold ${book.stock > 0 ? "text-blue-600" : "text-red-500"}`}
            >
              {book.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs uppercase text-gray-500 font-bold mb-1">
              Quantity
            </p>
            <p className="text-2xl font-semibold">{book.stock}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border">
            <p className="text-xs uppercase text-gray-500 font-bold mb-1">
              Added On
            </p>
            <p className="text-lg font-medium">
              {new Date(book.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Description Placeholder */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">About this book</h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
}
