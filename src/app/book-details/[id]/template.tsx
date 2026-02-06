import Header from "@/components/header";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="template-wrapper">
        <Header />
      {children}
    </div>
  );
}
