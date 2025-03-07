import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full px-2 flex justify-between items-center absolute py-1 z-50 left-0 top-0">
      <div className="flex items-center justify-center">
        <Image src={`/jain-logo.png`} alt="logo" width={200} height={200} className="size-12" />
        <p className="text-white text-2xl font-medium">Jain College</p>
      </div>
    </div>
  );
};

export default Navbar;
