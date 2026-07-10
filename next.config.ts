import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores the stray parent lockfile
  // (D:\AnushPortfolio\package-lock.json) and doesn't emit the root warning.
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Strict mode for React
  reactStrictMode: true,
};

export default nextConfig;
