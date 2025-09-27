import type { NextConfig } from "next";

const repoName = "Rechenspiel";
const nextConfig: NextConfig = {
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
