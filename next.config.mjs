import path from "path";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = withPayload({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Covers from Payload may come from any HTTPS origin (Supabase Storage/CDN).
      { protocol: "https", hostname: "**" },
    ],
  },
  // Old Dutch article URLs -> their English rewrites.
  async redirects() {
    return [
      { source: "/blog/mac-versus-pc-boutique-vs-grote-bureaus", destination: "/blog/mac-vs-pc-boutique-vs-big-firms", permanent: true },
      { source: "/blog/de-piloot-die-nooit-aankomt", destination: "/blog/the-pilot-that-never-lands", permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.alias["@payload-config"] = path.resolve("./payload.config.js");
    return config;
  },
});

export default nextConfig;
