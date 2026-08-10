/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/contact",
        destination:
          "https://www.linkedin.com/in/marc-rodriguez-moreno/?locale=es",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
