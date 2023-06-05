/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  env: {
    API_HOST:
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_HOST
        : process.env.DEPLOY_API_HOST,
    PORT:
      process.env.NODE_ENV === "development"
        ? process.env.DEV_PORT || 3306
        : process.env.DEPLOY_PORT || 443,
  },
};

module.exports = nextConfig;
