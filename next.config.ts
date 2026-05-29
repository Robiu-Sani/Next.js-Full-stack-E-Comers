import type { NextConfig } from "next";
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  turbopack: {},

  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Directs webpack to ignore handlebars' internal runtime extensions feature
      config.externals.push({
        handlebars: 'commonjs handlebars',
      });
    }
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default withPWA(nextConfig);
