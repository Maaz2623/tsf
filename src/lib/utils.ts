import { clsx, type ClassValue } from "clsx";
import { ConvexHttpClient } from "convex/browser";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
