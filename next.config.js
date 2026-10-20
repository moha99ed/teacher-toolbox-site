/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/gradebridge/pricing", destination: "/pricing", permanent: true },
    ];
  },
};

module.exports = nextConfig;
