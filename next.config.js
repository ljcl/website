const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mdx-bundler', 'shiki'],
  },
};

module.exports = nextConfig;
