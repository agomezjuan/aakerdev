import { test, expect } from "@playwright/test";

test("homepage loads correctly", async ({ page }) => {
  await page.goto("/");

  // Check that the page loads
  await expect(page).toHaveTitle(/Astro/);

  // Check for the main heading specifically
  await expect(page.getByRole("heading", { name: "Astro" })).toBeVisible();
});

test("navigation works", async ({ page }) => {
  await page.goto("/");

  // Test that the main heading is visible
  await expect(page.getByRole("heading", { name: "Astro" })).toBeVisible();

  // Test viewport meta tag is present (responsive design)
  const viewport = page.locator('meta[name="viewport"]');
  await expect(viewport).toHaveAttribute("content", /width=device-width/);
});

test("page has no console errors", async ({ page }) => {
  const consoleMessages: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleMessages.push(msg.text());
    }
  });

  await page.goto("/");

  // Wait a bit for any async operations
  await page.waitForTimeout(1000);

  expect(consoleMessages).toEqual([]);
});
