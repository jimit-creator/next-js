/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable the X-Powered-By header to improve security
  poweredByHeader: false,
  // Optional: Enable image optimization
  images: {
    domains: [],
  },
  // Allow cross-origin requests during development
  experimental: {
    allowedDevOrigins: ['*.replit.dev'],
  },
}

module.exports = nextConfig
