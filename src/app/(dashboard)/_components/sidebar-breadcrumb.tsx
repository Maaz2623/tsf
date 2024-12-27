"use client";

import Cart from "@/components/cart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import React from "react";

const SidebarBreadcrumb = () => {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Breadcrumb Section */}
      <Breadcrumb>
        <BreadcrumbList className="flex space-x-2 text-sm text-gray-500">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/events"
              className="hover:text-green-600 transition-colors duration-200"
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Cart Section */}
      <div className="relative flex items-center">
        <Cart />
      </div>
    </div>
  );
};

export default SidebarBreadcrumb;
