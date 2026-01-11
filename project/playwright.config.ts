import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright test configuration
 * Runs cross-browser e2e tests against the local Vite dev server.
 */
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://localhost:5174/',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'vite --port 5174',
    port: 5174,
    reuseExistingServer: true,
  },
});