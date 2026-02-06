"use client";

import { Button } from "@/components/ui/button";
import { BooksBreadcrumb } from "./breadcrumb";
import { Plus } from "lucide-react";
import { useState } from "react";

const Header = () => {
  
  
  return (
    <header className="flex items-center justify-between px-6 py-6 border-b bg-background">
      {/* Breadcrumb */}
      <BooksBreadcrumb />      
    </header>
  );
};

export default Header;
