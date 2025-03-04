import React from "react";
import { SparklesPreview } from "./sparkles-preview";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center overflow-hidden">
      <SparklesPreview />
      <div className="w-1/2 p-4 flex justify-center items-center mt-4">
        <Button size={`lg`} asChild className="z-50 cursor-pointer">
          <Link href={`/dashboard/events`}>
            Explore <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
