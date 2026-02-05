"use client";

import { Button } from "@/components/ui/button";
import { BooksBreadcrumb } from "./breadcrumb";
import { Plus } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      {/* Left: Breadcrumb */}
      <BooksBreadcrumb />

      {/* Right: Primary action */}
      <Button onClick={() => setOpen(true)} className="p-3.5 bg-blue-500 hover:bg-blue-600 text-white md:hover:cursor-pointer"><span><Plus className="mr-1"/></span>Add Book</Button>
    </header>
  );
};

export default Header;
