import { exo_2 } from "@/constants";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full px-2 flex justify-between items-center absolute py-2 z-50 left-0 top-0">
      <div className="flex items-start justify-center">
        <div className="relative size-10">
          <Image
            src={`/jain-logo.png`}
            alt="logo"
            fill
            className="flex justify-center items-center"
          />
        </div>
          <p
            className={`text-neutral-200 text-2xl font-medium ${exo_2.className}`}
          >
            Jain College
          </p>
      </div>
    </div>
  );
};

export default Navbar;
