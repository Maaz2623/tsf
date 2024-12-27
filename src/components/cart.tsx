import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cart = () => {
  return (
    <Link href={`/cart`} className="cursor-pointer relative group">
      {/* Cart Badge */}
      <span className="absolute flex items-center justify-center bg-green-600 rounded-full text-xs w-5 h-5 text-white font-bold -top-2 -right-2 shadow-md">
        50
      </span>
      {/* Cart Icon */}
      <ShoppingCartIcon className="text-gray-700 group-hover:text-green-600 transition-colors duration-200 w-6 h-6" />
    </Link>
  );
};

export default Cart;
