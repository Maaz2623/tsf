"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronsUpDownIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

const OrganisationDropdown = () => {
  const { open } = useSidebar();

  return (
    <DropdownMenu>
      {open ? (
        <DropdownMenuTrigger
          className="h-12 flex items-center justify-between cursor-pointer rounded-md disabled:cursor-not-allowed hover:bg-black/5 px-2"
          disabled
        >
          <>
            <div className="flex items-center justify-start gap-x-2">
              <Image
                src={`/logo.png`}
                alt="logo"
                width={100}
                height={100}
                className="size-7"
              />

              <p className="text-base truncate text-start font-semibold">
                The Student Forum
              </p>
            </div>
            <ChevronsUpDownIcon className="size-5" />
          </>
        </DropdownMenuTrigger>
      ) : (
        <div className="flex items-center justify-center p-1 -ml-3">
          <Image
            src={`/logo.png`}
            alt="logo"
            width={100}
            height={100}
            className="shrink-0 size-7"
          />
        </div>
      )}
      <DropdownMenuContent className="w-[250px]"></DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrganisationDropdown;
