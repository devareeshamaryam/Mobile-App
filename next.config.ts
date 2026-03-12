 /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      // ✅ Tumhara CDN — localhost development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/files/**',
      },
      // ✅ Tumhara CDN — production server
      {
        protocol: 'https',
        hostname: 'cdn.zmobiles.pk',
        port: '',
        pathname: '/files/**',
      },
    ],
    // ✅ Local development mein private IP allow karo
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

module.exports = nextConfig;