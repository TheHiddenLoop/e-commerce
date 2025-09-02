import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Navbar } from "../Navbar";
import { useState } from "react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-16 overflow-hidden bg-bgPrimary text-textPrimary">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Navbar onClick={() => setIsOpen(!isOpen)} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
