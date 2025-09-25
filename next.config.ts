import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',

  // Optimizaciones experimentales para rendimiento móvil
  experimental: {
    scrollRestoration: true,
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
  },

  // Optimización de imágenes mejorada para móvil
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Priorizar tamaños móvil
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // Cache 24h para mejor rendimiento
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimización para móvil
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Compresión avanzada
  compress: true,
  poweredByHeader: false,

  // Headers optimizados para rendimiento móvil
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Cache específico para recursos estáticos
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|css|js)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para fuentes
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack optimización para móvil
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev && !isServer) {
      // Optimizaciones para bundle size móvil
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all'
          },
          common: {
            minChunks: 2,
            priority: -20,
            chunks: 'all',
            reuseExistingChunk: true
          }
        }
      };

      // Tree shaking mejorado y compression avanzada
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.providedExports = true;
      config.optimization.innerGraph = true;

      // Minification avanzada
      config.optimization.minimize = true;

      // Remove unused CSS
      config.optimization.mergeDuplicateChunks = true;
      config.optimization.removeAvailableModules = true;
      config.optimization.removeEmptyChunks = true;
    }

    return config;
  },
};

export default nextConfig;
