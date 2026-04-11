"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const ArrayContent = [
    { name: "Home", path: "/" },
    { name: "Booking", path: "/booking" },
    { name: "About us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  function toggle() {
    setTheme((theme) => (theme == "dark" ? "light" : "dark"));
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b-0 border-t-0 border-x-0 bg-gray-200 dark:bg-neutral-700">
        <div className="container px-6 h-16 flex items-center justify-between">
          <div className="font-heading font-bold text-xl text-gradient dark:text-blue-200 ">
            Ryydex
          </div>
          <div className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Ride
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Drive
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Safety
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-secondary hover:bg-secondary/80 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-foreground" />
              ) : (
                <Moon className="w-4 h-4 text-foreground" />
              )}
            </button>
            <Button
              size="sm"
              className="rounded-lg font-heading font-semibold text-sm"
              asChild
            >
              <Link href={"/signUp"}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
