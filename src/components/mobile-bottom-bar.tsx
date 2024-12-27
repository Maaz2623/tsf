"use client";
import { mobilebarItems } from "@/constants/sidebar-items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MobileBottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden flex fixed bottom-0 left-0 border w-full bg-neutral-100">
      <div className="flex justify-between items-center w-full p-2">
        {mobilebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.link}
              key={item.link}
              className="flex flex-col justify-center relative items-center"
            >
              {Icon && <Icon className="size-8" />}{" "}
              {pathname.includes(item.link) && (
                <div className="bg-green-500 rounded-full w-4 h-1 absolute -bottom-1" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomBar;
