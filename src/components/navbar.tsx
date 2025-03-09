import { exo_2 } from "@/constants";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full px-6 flex justify-between items-center fixed py-1 z-50 left-0 top-0 backdrop-blur-md bg-black/30 border-b border-gray-700">
      {/* Left Logo + Title */}
      <div className="flex items-center gap-x-4">
        <div className="relative w-12 h-12">
          <Image
            src="/jain-logo.png"
            alt="Jain College Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div>
        <h1
          className={`${exo_2.className} text-white text-3xl font-semibold tracking-widest`}
        >
          TSF
        </h1>
      </div>

      {/* Right Logo */}
      <div className="relative w-12 h-12">
        <Image
          src="/logo.png"
          alt="Forum Logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Navbar;
