import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["*.asia-southeast1.run.app"],
  async redirects() {
    return [
      {
        source: '/research-centre/methodology',
        destination: '/methodology',
        permanent: true,
      },
      {
        source: '/share-your-story',
        destination: '/share-story',
        permanent: true,
      },
      {
        source: '/join',
        destination: '/join-movement',
        permanent: true,
      },
      {
        source: '/editorial-standards',
        destination: '/editorial-ethics',
        permanent: true,
      },
      {
        source: '/legal-policy',
        destination: '/legal-publication-policy',
        permanent: true,
      },
      {
        source: '/legal',
        destination: '/legal-publication-policy',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/legal-publication-policy',
        permanent: true,
      },
      {
        source: '/corrections',
        destination: '/research-centre/research-updates',
        permanent: true,
      },
      {
        source: '/areas-of-inquiry',
        destination: '/investigation#research-questions',
        permanent: true,
      },
      {
        source: '/source-safety',
        destination: '/share-story/evidence',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;

