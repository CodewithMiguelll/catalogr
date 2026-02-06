"use client";

import { BooksBreadcrumb } from "./breadcrumb";

const Header = () => {
  
  
  return (
    <header className="flex items-center justify-between px-6 py-6 border-b bg-background">
      {/* Breadcrumb */}
      <BooksBreadcrumb />      
    </header>
  );
};

export default Header;
