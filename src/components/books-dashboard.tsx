import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface Props {
  books: Book[];
}

const BooksDashboard = ({ books }: Props) => {
  return (
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
          {books.map((book) => (
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
        </tbody>
      </table>
    </div>
  );
};

export default BooksDashboard;
