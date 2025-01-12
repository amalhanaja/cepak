"use client";

import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex w-full max-w-7xl mx-auto px-4 justify-between h-14 items-center">
      <Link
        href="/"
        className="font-black text-xl hover:bg-accent py-2 px-4 rounded-xl"
      >
        CEPAK
      </Link>
      <div className="flex gap-2 items-center">
        <ThemeToggle />
        <SignedOut>
          <Button asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton fallback={<Loader2 className="animate-spin" />} />
        </SignedIn>
      </div>
    </header>
  );
};
