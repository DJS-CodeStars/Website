"use client";
import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", link: "/", icon: <></> },
  { name: "Problems", link: "/problems", icon: <></> },
  { name: "CF Analyzer", link: "/", icon: <></> },
  { name: "Contest Calendar", link: "/", icon: <></> },
  { name: "Hall of Fame", link: "/", icon: <></> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative w-full">
      {/* Floating Navbar for larger screens */}
      <div className="hidden md:block">
        <FloatingNav navItems={navItems} />
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
                <Link key={item.name} href={item.link}>
                  <Button className="my-2">{item.name}</Button>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <header>
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </header>

        {/* <FloatingNav navItems={navItems} /> */}
      </div>
    </div >
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
