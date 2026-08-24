import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // output: process.env.NODE_ENV === "production" ? "export" : undefined,

  distDir: "out",
  trailingSlash: true,
  /* CRITICAL FOR SERVERLESS ISOLATE RENDERS */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
