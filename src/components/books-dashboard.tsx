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
            {filteredBooks.map((book) => (
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
            {filteredBooks.length === 0 && (
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
      </div>
    </>
  );
};

export default BooksDashboard;
