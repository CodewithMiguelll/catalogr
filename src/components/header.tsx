"use client";

import { Button } from "@/components/ui/button";
import { BooksBreadcrumb } from "./breadcrumb";
import { Plus } from "lucide-react";
import { useState } from "react";

const Header = () => {
  
  
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      {/* Left: Breadcrumb */}
      <BooksBreadcrumb />

      {/* Right: Primary action */}
      
    </header>
  );
};

export default Header;
