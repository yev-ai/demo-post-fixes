import BundleAnalyzer from "@next/bundle-analyzer";
import { type NextConfig } from "next";

const performAnalysis = process.env.ANALYZE_BUNDLE === "1";

const withBundleAnalyzer = BundleAnalyzer({
  enabled: performAnalysis,
  openAnalyzer: performAnalysis,
});

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    // ppr: "incremental", // <- This will be useful later for streaming RSCs
    cssChunking: true,
    optimizeCss: true,
    optimizeServerReact: true,
    externalDir: true,
    esmExternals: true,
    reactCompiler: true,
    typedEnv: true,
    clientRouterFilter: true,
    clientRouterFilterRedirects: true,
    parallelServerCompiles: !performAnalysis,
    parallelServerBuildTraces: !performAnalysis,
    taint: true,
    optimizePackageImports: ["react", "@radix-ui/react-select"],
    useCache: true,
  },
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },
  allowedDevOrigins: ["*.yev.ai", "localhost"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "no-cache, no-store" }],
      },
      {
        source: "/api/stream/(.*)",
        headers: [
          { key: "Connection", value: "keep-alive" },
          { key: "Cache-Control", value: "no-transform" },
        ],
      },
      {
        source: "/api/ws/(.*)",
        headers: [
          { key: "Connection", value: "upgrade" },
          { key: "Upgrade", value: "$http_upgrade" },
          { key: "Cache-Control", value: "no-transform" },
        ],
      },
      {
        source: "/:path*\\.(svg|png|jpg|jpeg|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
} satisfies NextConfig;

export default performAnalysis ? withBundleAnalyzer(nextConfig) : nextConfig;
