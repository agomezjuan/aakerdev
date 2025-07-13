import { test, expect } from "@playwright/test";

test("homepage loads correctly", async ({ page }) => {
  await page.goto("/");

  // Check that the page loads with correct title
  await expect(page).toHaveTitle(/AakerDev - Full-Stack Developer Portfolio/);

  // Check for the main heading
  await expect(
    page.getByRole("heading", { name: "Welcome to AakerDev" }),
  ).toBeVisible();

  // Check for the portfolio tagline
  await expect(
    page.getByText("Full-Stack Developer Portfolio coming soon..."),
  ).toBeVisible();
});

test("homepage sections are present", async ({ page }) => {
  await page.goto("/");

  // Check for all required sections
  await expect(
    page.getByRole("heading", { name: "Professional Summary" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Technical Skills" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Featured Projects" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Latest Insights" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Let's Connect" }),
  ).toBeVisible();
});

test("about page loads correctly", async ({ page }) => {
  await page.goto("/about");

  // Check page title and main heading
  await expect(page).toHaveTitle(/About - AakerDev/);
  await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();

  // Check for professional sections
  await expect(
    page.getByRole("heading", { name: "Professional Story" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Technical Expertise" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Professional Experience" }),
  ).toBeVisible();
});

test("contact page loads correctly", async ({ page }) => {
  await page.goto("/contact");

  // Check page title and main heading
  await expect(page).toHaveTitle(/Contact - AakerDev/);
  await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();

  // Check for contact sections
  await expect(
    page.getByRole("heading", { name: "Get In Touch" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Send a Message" }),
  ).toBeVisible();

  // Check that contact form exists (form tag, even if empty)
  await expect(page.locator("form")).toBeInViewport();
});

test("blog index page loads correctly", async ({ page }) => {
  await page.goto("/blog");

  // Check page title and main heading
  await expect(page).toHaveTitle(/Blog - AakerDev/);
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();

  // Check for blog sections
  await expect(
    page.getByRole("heading", { name: "Featured Posts" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Categories" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "All Posts" })).toBeVisible();
});

test("projects index page loads correctly", async ({ page }) => {
  await page.goto("/projects");

  // Check page title and main heading (using level to be more specific)
  await expect(page).toHaveTitle(/Projects - AakerDev/);
  await expect(
    page.getByRole("heading", { name: "Projects", level: 1 }),
  ).toBeVisible();

  // Check for project sections
  await expect(
    page.getByRole("heading", { name: "Featured Projects" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "All Projects" }),
  ).toBeVisible();
});

test("404 page loads correctly", async ({ page }) => {
  await page.goto("/non-existent-page");

  // Check page title and main heading
  await expect(page).toHaveTitle(/Page Not Found - AakerDev/);
  await expect(
    page.getByRole("heading", { name: "404 - Page Not Found" }),
  ).toBeVisible();

  // Check for navigation links
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(page.getByRole("link", { name: "About" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
});

test("all pages have proper meta tags", async ({ page }) => {
  const pages = ["/", "/about", "/contact", "/blog", "/projects"];

  for (const path of pages) {
    await page.goto(path);

    // Check viewport meta tag is present (responsive design)
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute("content", /width=device-width/);

    // Check description meta tag is present
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content");

    // Check charset is set (meta tags are in head, not visible)
    const charset = page.locator('meta[charset="utf-8"]');
    await expect(charset).toHaveCount(1);
  }
});

test("pages have no console errors", async ({ page }) => {
  const consoleMessages: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleMessages.push(msg.text());
    }
  });

  const pages = ["/", "/about", "/contact", "/blog", "/projects"];

  for (const path of pages) {
    await page.goto(path);
    // Wait a bit for any async operations
    await page.waitForTimeout(500);
  }

  expect(consoleMessages).toEqual([]);
});
