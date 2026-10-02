import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = withPayload({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Covers uit Payload mogen van elk HTTPS-origin komen (Supabase Storage/CDN).
      { protocol: "https", hostname: "**" },
    ],
  },
});

export default nextConfig;
