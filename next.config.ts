import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  experimental: {
    useTypeScriptCli: false,
    workerThreads: true,
    webpackBuildWorker: false,
    cpus: 2,
  },
};

export default nextConfig;
