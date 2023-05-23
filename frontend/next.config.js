/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_HOST:
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_HOST
        : process.env.API_HOST,
    PORT:
      process.env.NODE_ENV === "development"
        ? process.env.DEV_PORT || 3306
        : process.env.DEPLOY_PORT || 3306,
  },
};

module.exports = nextConfig;
