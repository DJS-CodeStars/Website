"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { FloatingNav } from "@/components/ui/floating-navbar";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", link: "/", icon: <></> },
  { name: "About", link: "/", icon: <></> },
  { name: "Problems", link: "/problems", icon: <></> },
  { name: "Contact", link: "/", icon: <></> },
];

export function Navbar() {
  return (
    <div className="relative w-full">
      <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 bg-background text-foreground">
        <Link href="/" className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">DJS CodeStars</span>
        </Link>

        {/* Hamburger menu for mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
            <nav className="grid gap-4 text-sm font-medium">
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
          </SheetContent>
        </Sheet>

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

function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
