import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The default Vercel domain serves the same pages as www.ngocnhat.info. Google once picked a
  // vercel.app copy as the canonical and dropped the real domain, so send it there for good.
  redirects: () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "porfolial-v2.vercel.app" }],
      destination: "https://www.ngocnhat.info/:path*",
      permanent: true,
    },
  ],
};

export default nextConfig;
