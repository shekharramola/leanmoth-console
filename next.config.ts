import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Forces static HTML/JS compilation for Cloudflare Pages
};

export default nextConfig;
