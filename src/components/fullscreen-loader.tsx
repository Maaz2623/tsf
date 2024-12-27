import { LoaderPinwheelIcon } from "lucide-react";
import React from "react";
import { Sour_Gummy } from "next/font/google";
import { cn } from "@/lib/utils";

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["500"],
});

const FullscreenLoader = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 min-h-screen text-gray-900 w-full flex items-center justify-center z-50",
        className && className
      )}
    >
      <div className="flex flex-col items-center gap-y-1 justify-center">
        <LoaderPinwheelIcon className="animate-spin " />
        <p className={cn(`${sourGummy.className} text-lg antialiased`)}>
          {title}
        </p>
      </div>
    </div>
  );
};

export default FullscreenLoader;
