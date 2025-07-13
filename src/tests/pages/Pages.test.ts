import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Index from "../../pages/index.astro";
import About from "../../pages/about.astro";
import Contact from "../../pages/contact.astro";
import NotFound from "../../pages/404.astro";

describe("Page Components", () => {
  describe("Index Page", () => {
    it("should render with correct title and description", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Index);

      // Check for page title in the document
      expect(result).toContain("AakerDev - Full-Stack Developer Portfolio");
      expect(result).toContain(
        "Professional portfolio of a full-stack developer",
      );

      // Check for main heading
      expect(result).toContain("Welcome to AakerDev");
      expect(result).toContain("Full-Stack Developer Portfolio coming soon...");
    });

    it("should include all required sections", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Index);

      // Check for section headings
      expect(result).toContain("Professional Summary");
      expect(result).toContain("Technical Skills");
      expect(result).toContain("Featured Projects");
      expect(result).toContain("Latest Insights");
      expect(result).toContain("Let's Connect");

      // Check for section IDs
      expect(result).toContain('id="hero"');
      expect(result).toContain('id="skills-overview"');
      expect(result).toContain('id="featured-projects"');
      expect(result).toContain('id="recent-posts"');
      expect(result).toContain('id="call-to-action"');
    });
  });

  describe("About Page", () => {
    it("should render with correct title and description", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(About);

      // Check for page title
      expect(result).toContain("About - AakerDev");
      expect(result).toContain("Professional background, technical expertise");

      // Check for main heading
      expect(result).toContain("About Me");
      expect(result).toContain(
        "Professional story and technical background coming soon...",
      );
    });

    it("should include all professional sections", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(About);

      // Check for section headings
      expect(result).toContain("Professional Story");
      expect(result).toContain("Technical Expertise");
      expect(result).toContain("Professional Experience");
      expect(result).toContain("Education & Certifications");
      expect(result).toContain("Beyond Code");

      // Check for section IDs
      expect(result).toContain('id="professional-story"');
      expect(result).toContain('id="technical-expertise"');
      expect(result).toContain('id="experience"');
      expect(result).toContain('id="education"');
      expect(result).toContain('id="personal"');
    });
  });

  describe("Contact Page", () => {
    it("should render with correct title and description", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Contact);

      // Check for page title
      expect(result).toContain("Contact - AakerDev");
      expect(result).toContain(
        "Get in touch for opportunities, collaborations",
      );

      // Check for main heading
      expect(result).toContain("Contact");
      expect(result).toContain(
        "Professional contact information and form coming soon...",
      );
    });

    it("should include all contact sections", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Contact);

      // Check for section headings
      expect(result).toContain("Get In Touch");
      expect(result).toContain("Send a Message");
      expect(result).toContain("Availability");
      expect(result).toContain("Connect");

      // Check for section IDs
      expect(result).toContain('id="contact-methods"');
      expect(result).toContain('id="contact-form"');
      expect(result).toContain('id="availability"');
      expect(result).toContain('id="social-links"');

      // Check for form element
      expect(result).toContain("form");
    });
  });

  describe("404 Error Page", () => {
    it("should render with correct error title and description", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(NotFound);

      // Check for page title
      expect(result).toContain("Page Not Found - AakerDev");
      expect(result).toContain("The page you're looking for doesn't exist");

      // Check for error heading
      expect(result).toContain("404 - Page Not Found");
      expect(result).toContain(
        "Sorry, the page you're looking for doesn't exist.",
      );
    });

    it("should provide navigation alternatives", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(NotFound);

      // Check for navigation help section
      expect(result).toContain("Try these instead:");
      expect(result).toContain('id="navigation-help"');

      // Check for alternative links
      expect(result).toContain('href="/"');
      expect(result).toContain('href="/about"');
      expect(result).toContain('href="/projects"');
      expect(result).toContain('href="/blog"');
      expect(result).toContain('href="/contact"');

      // Check link text
      expect(result).toContain("Home");
      expect(result).toContain("About");
      expect(result).toContain("Projects");
      expect(result).toContain("Blog");
      expect(result).toContain("Contact");
    });
  });
});
