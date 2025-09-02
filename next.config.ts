import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tcgplayer-cdn.tcgplayer.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
