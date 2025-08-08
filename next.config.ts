import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    // remotePatterns: [new URL('http://192.168.10.252:9002'), new URL('http://upatholink.unicloud-med.com:9001')],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.10.252',
        port: '9001'
      },
      {
        protocol: 'http',
        hostname: '192.168.10.252',
        port: '9002'
      },
      {
        protocol: 'http',
        hostname: 'upatholink.unicloud-med.com',
        port: '9001',
      }
    ]
  },
};

export default nextConfig;
