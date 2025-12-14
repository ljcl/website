import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { CodeHikeConfig } from "codehike/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/",
        permanent: true,
      },
      {
        source: "/a-few-points-on-seo",
        destination: "/posts/a-few-points-on-seo",
        permanent: true,
      },
      {
        source: "/save-your-commit-history-to-a-running-harvest-timer",
        destination:
          "/posts/save-your-commit-history-to-a-running-harvest-timer",
        permanent: true,
      },
      {
        source: "/search-301-redirect-changes",
        destination: "/posts/search-301-redirect-changes",
        permanent: true,
      },
      {
        source: "/why-you-should-be-using-http-2-and-https",
        destination: "/posts/why-you-should-be-using-http-2-and-https",
        permanent: true,
      },
      {
        source: "/migrating-the-platform-that-powers-abc-sites-to-typescript",
        destination:
          "/posts/migrating-the-platform-that-powers-abc-sites-to-typescript",
        permanent: true,
      },
    ];
  },
};

const chConfig: CodeHikeConfig = {
  components: { code: "Code", inlineCode: "InlineCode" },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-gfm", ["remark-codehike", chConfig]],
    recmaPlugins: [["recma-codehike", chConfig]],
  },
});

const config = async () => {
  const withAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  });
  return withAnalyzer(withMDX(nextConfig));
};

export default config;
