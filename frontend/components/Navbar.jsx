"use client";
import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation'; // Use this for Next.js 13 App Router

const navItems = [
  { name: "Problem Recommender", link: "/problems", icon: <></> },
  { name: "Leaderboard", link: "/leaderboard", icon: <></> },
  { name: "CF Analyzer", link: "/analyzer", icon: <></> },
  { name: "Contest Calendar", link: "/calendar", icon: <></> },
  { name: "Hall of Fame", link: "/falloffame", icon: <></> },
  { name: "Home", link: "/", icon: <></> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname(); // Get the current route

  console.log(currentPath); // Debugging line

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (link) => {
    window.location.href = link; // Use window.location for navigation in App Router
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Floating Navbar for larger screens */}
      <div className="hidden md:block">
        <FloatingNav navItems={navItems} currentPath={currentPath} />
      </div>
      {/* Hamburger Menu for smaller screens */}
      <div className="md:hidden flex justify-between items-center p-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <MenuIcon onClick={toggleMenu} className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="w-3/4 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-center">
              {navItems.map((item) => (
                currentPath === item.link ? (
                  <button
                    key={item.name}
                    className="my-2 border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full relative bg-yellow-100 dark:bg-yellow-800"
                  >
                    <span>{item.name}</span>
                    <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px" />
                  </button>
                ) : (
                  <Button
                    key={item.name}
                    className="my-2"
                    onClick={() => handleNavigation(item.link)}
                  >
                    {item.name}
                  </Button>
                )
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
