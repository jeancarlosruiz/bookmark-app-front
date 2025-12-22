import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilitar salida standalone para Docker
  output: 'standalone',
};

export default nextConfig;
