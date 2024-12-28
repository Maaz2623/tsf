"use client";
import { mobilebarItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileBottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-neutral-800 border-t border-neutral-600 shadow-xl">
      <div className="flex justify-between items-center w-full py-2 px-4">
        {mobilebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.link}
              key={item.link}
              className={cn(
                "flex flex-col bg-transparent   justify-center items-center relative group transition-all duration-300 ease-in-out"
              )}
            >
              <div className="flex items-center bg-transparent justify-center p-2 rounded-lg transition-all duration-200 ease-in-out">
                {Icon && (
                  <Icon
                    className={cn(
                      "text-2xl text-neutral-300 bg-transparent transition-all duration-200",
                      pathname.includes(item.link) && "text-white"
                    )}
                  />
                )}
              </div>
              <div
                className={cn(
                  "bg-green-500 rounded-full w-6 h-1 absolute -bottom-1 transition-all scale-x-0 duration-100",
                  pathname.includes(item.link) && "scale-x-100"
                )}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomBar;
