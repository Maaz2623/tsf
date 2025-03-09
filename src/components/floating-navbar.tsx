/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const isMobile = useIsMobile();

  const pathname = usePathname();

  if (!isMobile) return;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={cn(
          "flex max-w-fit z-40 fixed bottom-1 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          const isActive = pathname.includes(navItem.link);
          return (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative flex flex-col items-center justify-center px-4 py-1 rounded-lg text-neutral-600 dark:text-neutral-50 transition-all duration-200 hover:text-neutral-500 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10",
                isActive && "text-green-500 bg-neutral-100"
              )}
            >
              <span className="text-lg sm:text-base">{navItem.icon}</span>
              <span className=" sm:inline-block text-xs font-medium">
                {navItem.name}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
