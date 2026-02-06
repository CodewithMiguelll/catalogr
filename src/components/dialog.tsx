"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Book } from "@/lib/types";

interface AddBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBook: (book: Book) => void;
  onUpdateBook: (book: Book) => void;
  editingBook: Book | null;
}

const AddBookDialog = ({
  open,
  onOpenChange,
  onAddBook,
  onUpdateBook,
  editingBook,
}: AddBookDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
  });

  // 1. LISTEN FOR CHANGES: This fills the form when editingBook changes
  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        price: String(editingBook.price),
        stock: String(editingBook.stock),
      });
    } else {
      // Clear form if adding a new book
      setFormData({ title: "", author: "", price: "", stock: "" });
    }
  }, [editingBook, open]);

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const bookData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    // 2. CONDITIONAL SUBMIT: Check if we are editing or adding
    if (editingBook) {
      onUpdateBook({
        ...editingBook, // Keep the original ID and createdAt
        ...bookData,
      });
    } else {
      onAddBook({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...bookData,
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          {/* 3. DYNAMIC TITLE */}
          <DialogTitle>
            {editingBook ? "Edit Book" : "Add New Book"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <label className="block font-normal">Title</label>
          <input
            className="w-full border-2 rounded-md p-1.5"
            placeholder="Book Title"
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
          />

          <label className="block font-normal">Author</label>
          <input
            className="w-full border-2 rounded-md p-1.5"
            placeholder="John Doe"
            value={formData.author}
            onChange={(e) => updateField("author", e.target.value)}
          />

          <label className="block font-normal">Price</label>
          <input
            className="w-full border-2 rounded-md p-1.5"
            type="number"
            placeholder="$12.76"
            value={formData.price}
            onChange={(e) => updateField("price", e.target.value)}
          />

          <label className="block font-normal">Stock</label>
          <input
            className="w-full border-2 rounded-md p-1.5"
            type="number"
            placeholder="How many copies?"
            value={formData.stock}
            onChange={(e) => updateField("stock", e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {/* 4. DYNAMIC BUTTON TEXT */}
            {editingBook ? "Save Changes" : "Add Book"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddBookDialog;
