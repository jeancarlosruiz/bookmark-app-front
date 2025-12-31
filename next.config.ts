import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilitar salida standalone para Docker
  output: 'standalone',

  // Permitir imágenes de cualquier dominio (para favicons externos)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
