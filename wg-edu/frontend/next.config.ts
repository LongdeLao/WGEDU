import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Optimize for production deployment
  // In development, proxy API requests to the Go server
  async rewrites() {
    return process.env.NODE_ENV === 'development' 
      ? [
          {
            source: '/api/:path*',
            destination: 'http://47.79.6.81:8080/:path*', // For local development
          },
        ]
      : []; // In production, Nginx will handle the proxy
  },
  // Add CORS headers
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

export default nextConfig;
