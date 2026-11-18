import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3119',
    viewport: { width: 360, height: 800 },
    trace: 'retain-on-failure',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command:
      'npm run build && npm run start -- --hostname 127.0.0.1 --port 3119',
    url: 'http://127.0.0.1:3119',
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_CONTACT_PREVIEW: 'true',
      NEXT_PUBLIC_SITE_INDEXABLE: 'false',
      NEXT_PUBLIC_SITE_URL: '',
    },
  },
});
