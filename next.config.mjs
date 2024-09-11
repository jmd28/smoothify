/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/playlists',
        permanent: true,
      },]
  }
};

export default nextConfig;
