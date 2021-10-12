import bundleAnalyzer from "@next/bundle-analyzer";
import mdx from "@next/mdx";

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  serverExternalPackages: ["shiki", "rehype-pretty-code"],
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

const config = async () => {
  const plugins = [
    bundleAnalyzer({
      enabled: process.env.ANALYZE === "true",
    }),
    mdx({
      options: {
        remarkPlugins: ["remark-gfm"],
        rehypePlugins: [
          [
            "rehype-pretty-code",
            {
              theme: "github-dark",
            },
          ],
        ],
      },
    }),
  ];
  return plugins.reduce((acc, next) => next(acc), nextConfig);
};

export default config;
