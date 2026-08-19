import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  /* CRITICAL FOR SERVERLESS ISOLATE RENDERS */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
