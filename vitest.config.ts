import { defineConfig } from "vitest/config";
import { getViteConfig } from "astro/config";

export default defineConfig(
  getViteConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
      exclude: ["node_modules/**", "dist/**", ".astro/**", "e2e/**"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"],
        reportsDirectory: "./coverage",
        exclude: [
          "node_modules/",
          "dist/",
          ".astro/",
          "**/*.config.{js,ts,mjs}",
          "**/*.d.ts",
          "e2e/**",
        ],
      },
      reporters: ["default", "junit"],
      outputFile: {
        junit: "./test-results/junit.xml",
      },
    },
  }),
);
