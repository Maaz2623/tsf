"use client";
import React, { useEffect, useState } from "react";
import { Teko } from "next/font/google";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./auth-dialog";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const teko = Teko({
  subsets: ["latin"],
  weight: ["600"],
});

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="border-gray-150 dark:border-gray-800 h-14 px-4 py-3 flex border-b justify-between items-center">
      <div className={`flex items-center justify-center gap-x-1`}>
        <Image
          src={`/logo.png`}
          alt="logo"
          width={100}
          height={100}
          className="border size-10"
        />
        <p className={`${teko.className} text-xl sm:text-2xl lg:text-3xl`}>
          The Student Forum
        </p>
      </div>

      <div className="flex gap-x-2 items-center">
        {theme === "light" && (
          <MoonIcon
            className="dark:hover:bg-white/5 hover:bg-black/5 cursor-pointer rounded-sm size-8 p-1"
            onClick={() => setTheme("dark")}
          />
        )}
        {theme === "dark" && (
          <SunIcon
            className="dark:hover:bg-white/5 hover:bg-black/5 cursor-pointer size-8 rounded-sm p-1"
            onClick={() => setTheme("light")}
          />
        )}
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={`secondary`}>Sign in</Button>
            </DialogTrigger>
            <DialogContent className="flex justify-center items-center bg-transparent border-none shadow-none">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <SignIn signUpFallbackRedirectUrl={`/events`} routing="hash" />
            </DialogContent>
          </Dialog>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
