"use client";

import { Button } from "@/components/ui/button";
import { BooksBreadcrumb } from "./breadcrumb";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      {/* Left: Breadcrumb */}
      <BooksBreadcrumb />

      {/* Right: Primary action */}
      <Button className="p-3.5 bg-blue-500 hover:bg-emerald-600 text-white"><span><Plus className="mr-1"/></span>Add Book</Button>
    </header>
  );
};

export default Header;
