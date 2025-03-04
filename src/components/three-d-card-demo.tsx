"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { StarIcon, UsersIcon } from "lucide-react";

export function ThreeDCardDemo({
  title,
  description,
  price,
  rating,
  teamSize,
}: {
  title: string;
  description: string;
  price: number | "Free";
  rating: number;
  teamSize: number;
}) {
  return (
    <CardContainer className="inter-var cursor-pointer -mt-20">
      <CardBody
        className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] 
        w-[300px] md:w-[300px] h-auto min-h-[360px] sm:h-[360px] rounded-xl p-4 border flex flex-col"
      >
        {/* Title */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>

        {/* Image */}
        <CardItem translateZ="100" className="w-full mt-4 flex-grow">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-[140px] w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>

        {/* Rating & Price Section */}
        <div className="mt-4 flex flex-col flex-grow">
          {/* Rating */}
          <div className="flex justify-between w-full items-center">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-sm font-normal flex items-center dark:text-white"
            >
              {Array.from({ length: rating }).map((_, i) => (
                <StarIcon key={i} className="size-4" fill="currentColor" />
              ))}
            </CardItem>
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-sm font-normal flex items-center dark:text-white"
            >
              <UsersIcon className="mr-1 size-4" />
              {teamSize}
            </CardItem>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex justify-between items-center mt-auto">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
            >
              {price === "Free" ? "Free" : <>₹{price}</>}
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Add to cart
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
