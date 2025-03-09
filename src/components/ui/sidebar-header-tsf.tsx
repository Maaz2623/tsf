"use client";
import React from "react";
import { useSidebar } from "./sidebar";
import Image from "next/image";
import { exo_2 } from "@/constants";

const SidebarHeaderTsf = () => {
  const { open } = useSidebar();

  return (
    <div className="bg-white h-14 mb-2 rounded-lg border flex shadow-sm justify-start gap-x-2 items-center px-2">
      <div className="relative size-8">
        <Image
          src={`/logo.png`}
          alt="logo"
          fill
          className="aspect-square absolute font-semibold"
        />
      </div>
      {open && (
        <p
          className={`${exo_2.className} text-[20px] transition-all duration-300`}
        >
          The Student Forum
        </p>
      )}
    </div>
  );
};

export default SidebarHeaderTsf;
