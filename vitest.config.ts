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
        reporter: ["text", "text-summary", "json", "html", "lcov"],
        reportsDirectory: "./coverage",
        // Include all source files except tests and config files
        include: [
          "src/**/*.{js,ts,jsx,tsx,astro}",
          "!src/**/*.{test,spec}.{js,ts,jsx,tsx}",
        ],
        exclude: [
          "node_modules/",
          "dist/",
          ".astro/",
          "**/*.config.{js,ts,mjs}",
          "**/*.d.ts",
          "e2e/**",
        ],
        // Set coverage thresholds
        thresholds: {
          global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
          },
        },
      },
      reporters: ["default", "junit"],
      outputFile: {
        junit: "./test-results/junit.xml",
      },
    },
  }),
);
