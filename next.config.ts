import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    COPILOT_API_KEY: process.env.COPILOT_API_KEY,
    COPILOT_BASE_API_URI: process.env.COPILOT_BASE_API_URI,
  },
};

export default nextConfig;
