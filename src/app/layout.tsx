import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCProvider } from "@/trpc/client";
import Head from "next/head";

export const metadata: Metadata = {
  title: "The Student Forum",
  description: "Join and explore our forum",
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
        <Head>
          <meta name="color-scheme" content="light" />
        </Head>
        <body className={`antialiased ${poppins.className} relative`}>
          <TRPCProvider>{children}</TRPCProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
