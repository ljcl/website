# instant-nav rig: lukeclark

- BUILD: `EXPOSE_TESTING_API=1 pnpm build`; Playwright `webServer` runs `pnpm start -p 3124`
- EXPOSE: `EXPOSE_TESTING_API=1` at build time sets `experimental.exposeTestingApiInProductionBuild`
- RUN: `pnpm test:e2e` (build + `playwright test`); baseURL http://localhost:3124 in `playwright.config.ts`
- TEST USER: public; no authentication; state: posts from `content/posts`, Pinboard via `.env.local`
- DRIFT: none known; homepage order depends on Pinboard pin dates, tests select the first post link
- CONTRACTS: homepage PostCard and post Older/Newer PostCard to `/posts/[slug]`; title, date and body ready before click; nothing navigation-only; viewport trigger (`prefetch` on PostCard)
- LOOP: local build, start, test; agent limits: none
- LIVENESS: n/a; local build and start
- WALLS: build needs `PINBOARD_AUTH` in `.env.local`; kill anything on :3124 first (`lsof -ti :3124 | xargs kill`)
