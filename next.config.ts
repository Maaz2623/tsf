import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "8i3zvqcf63.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
