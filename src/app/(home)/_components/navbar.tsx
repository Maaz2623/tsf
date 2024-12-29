import { Teko } from "next/font/google";
import Image from "next/image";
import React from "react";

const teko = Teko({
  subsets: ["latin"],
  weight: ["600"],
});

const Navbar = () => {
  return (
    <nav className="border w-full flex justify-between px-2 p-2">
      <div className="flex items-center justify-center">
        <Image
          src={`/logo.png`}
          alt="logo"
          width={100}
          height={100}
          className="size-9"
        />
        <p className={`${teko.className} text-3xl`}>The Student Forum</p>
      </div>
    </nav>
  );
};

export default Navbar;
