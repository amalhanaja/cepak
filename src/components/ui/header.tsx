"use client";

import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export const Header = () => {
  return (
    <header className="flex w-full max-w-7xl mx-auto px-4 justify-between h-14 items-center">
      <Link
        href="/"
        className="font-black text-xl hover:bg-accent py-2 px-4 rounded-xl"
      >
        CEPAK
      </Link>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
};
