import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  books: Book[];
}

const BooksDashboard = ({ books }: Props) => {
  
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");

const ITEMS_PER_PAGE = 5;

const [currentPage, setCurrentPage] = useState(1);


  const filteredBooks = books?.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesStock =
      stockFilter === "all"
        ? true
        : stockFilter === "in"
          ? book.stock > 0
          : book.stock === 0;

    return matchesSearch && matchesStock;
  });

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);


  return (
    <>
      {/* Search bar */}
      <div className="p-3 flex items-center mt-2">
        <input
          type="text"
          placeholder="Search books..."
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-md"
        />
        <span className="bg-blue-500 rounded-sm p-3 ml-1 cursor-pointer">
          <Search className="text-white" />
        </span>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as any)}
          className="ml-3 p-3 border rounded-md"
        >
          <option value="all">All</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Added</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedBooks.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-3 font-medium">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">${book.price.toFixed(2)}</td>
                <td className="p-3">{book.stock}</td>
                <td className="p-3 text-sm text-muted-foreground">
                  {new Date(book.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 text-right space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            {paginatedBooks.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-muted-foreground"
                >
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}

        <div className="flex justify-between items-center mt-4.5 space-x-2">
          <div>
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="space-x-4">
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BooksDashboard;
