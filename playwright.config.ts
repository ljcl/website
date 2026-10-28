import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  use: { baseURL: "http://localhost:3124" },
  webServer: {
    command: "pnpm start -p 3124",
    url: "http://localhost:3124",
    reuseExistingServer: false,
  },
});
