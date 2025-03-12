import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/trpc/client";
import { JotaiProvider } from "@/components/jotai-provider";

export const metadata: Metadata = {
  title: "The Student Forum",
  description: "Join and explore our forum",
  other: {
    "color-schema": "light only",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`antialiased ${poppins.className} relative`}>
          <TRPCProvider>
            <JotaiProvider>{children}</JotaiProvider>
          </TRPCProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
