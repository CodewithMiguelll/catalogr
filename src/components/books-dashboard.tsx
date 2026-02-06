import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import AddBookDialog from "./dialog";

interface Props {
  books: Book[];
  onDeleteBook: (id: string) => void;
  onEditBook: (book: Book) => void;
}

const BooksDashboard = ({ books, onDeleteBook, onEditBook }: Props) => {
  
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");

const ITEMS_PER_PAGE = 5;

const [currentPage, setCurrentPage] = useState(1);
const [open, setOpen] = useState(false);

  const handleAddBook = (book: Book) => {
    // Handle adding the book to the list
    books.push(book);
    setOpen(false);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    // Find the index of the book to update
    const index = books.findIndex((book) => book.id === updatedBook.id);

    // If the book is found, update it
    if (index !== -1) {
      books[index] = updatedBook;
    }

    setOpen(false);
  };

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
      <div className="p-3 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search books..."
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md"
          />
          <span className="bg-blue-500 rounded-sm p-3 cursor-pointer">
            <Search className="text-white" />
          </span>
        </div>
        <div className="flex justify-end items-center gap-4 mt-4.5">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="w-full md:w-auto p-1.5 border rounded-md"
          >
            <option value="all">All</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
          <Button
            onClick={() => setOpen(true)}
            className="w-1/2 md:w-auto p-5 bg-blue-500 hover:bg-blue-600 text-white md:hover:cursor-pointer"
          >
            <Plus className="mr-1" />
            Add Book
          </Button>
        </div>
        <AddBookDialog
          open={open}
          onOpenChange={setOpen}
          onAddBook={handleAddBook}
          onUpdateBook={handleUpdateBook}
          editingBook={null}       
        />
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-md text-sm md:text-base">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 md:p-3 text-left">Title</th>
              <th className="p-2 md:p-3 text-left hidden md:table-cell">
                Author
              </th>
              <th className="p-2 md:p-3 text-left">Price</th>
              <th className="p-2 md:p-3 text-left hidden sm:table-cell">
                Stock
              </th>
              <th className="p-2 md:p-3 text-left hidden lg:table-cell">
                Added
              </th>
              <th className="p-2 md:p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedBooks.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-2 md:p-3 font-medium">{book.title}</td>
                <td className="p-2 md:p-3 hidden md:table-cell">
                  {book.author}
                </td>
                <td className="p-2 md:p-3">${book.price.toFixed(2)}</td>
                <td className="p-2 md:p-3 hidden sm:table-cell">
                  {book.stock}
                </td>
                <td className="p-2 md:p-3 text-sm text-muted-foreground hidden lg:table-cell">
                  {new Date(book.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 md:p-3 text-right space-x-1 md:space-x-2 space-y-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEditBook(book)}
                    className="text-xs md:text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteBook(book.id)}
                    className="text-xs md:text-sm"
                  >
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

        <div className="flex flex-col md:flex-row justify-between items-center mt-4.5 gap-4">
          <div>
            <p className="text-sm">
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="space-x-2 md:space-x-4">
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
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
