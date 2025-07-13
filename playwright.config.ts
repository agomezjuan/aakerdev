import { defineConfig, devices } from "@playwright/test";

const devPort = 4321;

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./.playwright/test-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { outputFolder: "./.playwright/reports" }],
    ["junit", { outputFile: "./.playwright/test-results/junit.xml" }],
    ["json", { outputFile: "./.playwright/test-results/results.json" }],
  ],
  use: {
    baseURL: `http://localhost:${devPort}`,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    // Mobile viewports
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  webServer: {
    command: "pnpm dev",
    port: devPort,
    reuseExistingServer: !process.env.CI,
  },
});
