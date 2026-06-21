import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js and related packages for proper tree-shaking
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],

  // Turbopack config (Next.js 16+ default bundler)
  turbopack: {},

  // Strict mode for React
  reactStrictMode: true,
};

export default nextConfig;
