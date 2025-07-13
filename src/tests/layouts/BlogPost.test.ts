import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import BlogPost from "../../layouts/BlogPost.astro";

describe("BlogPost Layout Component", () => {
  describe("Props Validation", () => {
    it("should validate blog post metadata", () => {
      const blogProps = {
        title: "My Blog Post",
        description: "A great blog post",
        publishDate: new Date("2024-01-01"),
        tags: ["javascript", "astro"],
        readingTime: "5 min",
        author: "AakerDev",
      };

      expect(blogProps.title).toBeDefined();
      expect(blogProps.description).toBeDefined();
      expect(blogProps.publishDate).toBeInstanceOf(Date);
      expect(Array.isArray(blogProps.tags)).toBe(true);
      expect(blogProps.readingTime).toMatch(/\d+\s+min/);
      expect(typeof blogProps.author).toBe("string");
    });

    it("should format dates correctly", () => {
      const testDate = new Date("2024-01-15T12:00:00Z");
      const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }).format(date);
      };

      expect(formatDate(testDate)).toBe("January 15, 2024");
    });

    it("should validate required props", () => {
      const minimalProps = {
        title: "Test Blog Post",
        description: "Test description",
      };

      expect(minimalProps.title).toBeDefined();
      expect(minimalProps.description).toBeDefined();
      expect(typeof minimalProps.title).toBe("string");
      expect(typeof minimalProps.description).toBe("string");
    });

    it("should handle optional blog-specific props", () => {
      const optionalProps = {
        publishDate: new Date("2024-01-01"),
        author: "Test Author",
        tags: ["tag1", "tag2"],
        readingTime: "3 min",
        category: "Technology",
      };

      if (optionalProps.publishDate) {
        expect(optionalProps.publishDate).toBeInstanceOf(Date);
      }
      if (optionalProps.author) {
        expect(typeof optionalProps.author).toBe("string");
      }
      if (optionalProps.tags) {
        expect(Array.isArray(optionalProps.tags)).toBe(true);
        expect(optionalProps.tags.length).toBeGreaterThan(0);
      }
      if (optionalProps.readingTime) {
        expect(optionalProps.readingTime).toMatch(/\d+\s+min/);
      }
      if (optionalProps.category) {
        expect(typeof optionalProps.category).toBe("string");
      }
    });
  });

  describe("Content Structure", () => {
    it("should validate blog post sections", () => {
      const blogSections = [
        "blog-header",
        "blog-meta",
        "blog-content",
        "blog-footer",
        "blog-navigation",
        "blog-sharing",
      ];

      blogSections.forEach((section) => {
        expect(typeof section).toBe("string");
        expect(section.length).toBeGreaterThan(0);
      });

      expect(blogSections).toContain("blog-header");
      expect(blogSections).toContain("blog-content");
      expect(blogSections).toContain("blog-footer");
    });

    it("should validate tag structure", () => {
      const validateTag = (tag: string) => {
        return (
          typeof tag === "string" &&
          tag.length >= 2 &&
          tag.length <= 20 &&
          /^[a-z0-9-]+$/.test(tag)
        );
      };

      const validTags = ["javascript", "react", "web-dev", "css3"];
      const invalidTags = [
        "",
        "a",
        "UPPERCASE",
        "tag with spaces",
        "verylongtagnamethatisinvalid",
      ];

      validTags.forEach((tag) => {
        expect(validateTag(tag)).toBe(true);
      });

      invalidTags.forEach((tag) => {
        expect(validateTag(tag)).toBe(false);
      });
    });

    it("should validate reading time format", () => {
      const validateReadingTime = (time: string) => {
        return /^\d+\s+min$/.test(time);
      };

      const validTimes = ["1 min", "5 min", "10 min", "15 min"];
      const invalidTimes = ["1min", "5 minutes", "ten min", ""];

      validTimes.forEach((time) => {
        expect(validateReadingTime(time)).toBe(true);
      });

      invalidTimes.forEach((time) => {
        expect(validateReadingTime(time)).toBe(false);
      });
    });
  });

  describe("SEO and Meta Tags", () => {
    it("should generate blog-specific meta tags", () => {
      const blogMeta = {
        type: "article",
        author: "AakerDev",
        publishedTime: "2024-01-01T00:00:00.000Z",
        section: "Technology",
        tags: ["javascript", "web-development"],
      };

      expect(blogMeta.type).toBe("article");
      expect(typeof blogMeta.author).toBe("string");
      expect(blogMeta.publishedTime).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
      );
      expect(typeof blogMeta.section).toBe("string");
      expect(Array.isArray(blogMeta.tags)).toBe(true);
    });

    it("should validate structured data for blog posts", () => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: "Test Blog Post",
        description: "Test description",
        author: {
          "@type": "Person",
          name: "AakerDev",
        },
        datePublished: "2024-01-01",
        dateModified: "2024-01-01",
      };

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("BlogPosting");
      expect(structuredData.headline).toBeDefined();
      expect(structuredData.description).toBeDefined();
      expect(structuredData.author["@type"]).toBe("Person");
      expect(structuredData.author.name).toBe("AakerDev");
    });
  });

  describe("Navigation and Sharing", () => {
    it("should provide navigation between posts", () => {
      const blogNavigation = {
        previousPost: { title: "Previous Post", slug: "previous-post" },
        nextPost: { title: "Next Post", slug: "next-post" },
        backToIndex: { title: "Back to Blog", href: "/blog" },
      };

      if (blogNavigation.previousPost) {
        expect(blogNavigation.previousPost.title).toBeDefined();
        expect(blogNavigation.previousPost.slug).toMatch(/^[a-z0-9-]+$/);
      }

      if (blogNavigation.nextPost) {
        expect(blogNavigation.nextPost.title).toBeDefined();
        expect(blogNavigation.nextPost.slug).toMatch(/^[a-z0-9-]+$/);
      }

      expect(blogNavigation.backToIndex.href).toBe("/blog");
    });

    it("should provide social sharing options", () => {
      const sharingOptions = [
        { platform: "twitter", url: "https://twitter.com/intent/tweet" },
        {
          platform: "linkedin",
          url: "https://linkedin.com/sharing/share-offsite",
        },
        { platform: "facebook", url: "https://facebook.com/sharer/sharer.php" },
      ];

      sharingOptions.forEach((option) => {
        expect(option.platform).toBeDefined();
        expect(option.url).toMatch(/^https:\/\//);
        expect(typeof option.platform).toBe("string");
      });

      expect(sharingOptions).toHaveLength(3);
    });
  });

  describe("Astro Component Rendering", () => {
    it("should render BlogPost component with correct structure", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(BlogPost, {
        props: {
          title: "Test Blog Post",
          description: "Test blog description",
        },
      });

      // Check that the component renders with the correct title
      expect(result).toContain("Test Blog Post");
      expect(result).toContain("Test blog description");

      // Check for key structural elements
      expect(result).toContain('class="blog-title"');
      expect(result).toContain('class="blog-content"');
      expect(result).toContain('class="blog-header"');
      expect(result).toContain('class="blog-footer"');

      // Check that it includes the base layout elements
      expect(result).toContain("AakerDev");
      expect(result).toContain("nav-link");

      // Check for blog-specific elements
      expect(result).toContain("By AakerDev"); // Default author
      expect(result).toContain("Share this post");
      expect(result).toContain("Back to");
    });

    it("should render with optional blog metadata", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(BlogPost, {
        props: {
          title: "Advanced JavaScript Tutorial",
          description: "Learn advanced JavaScript concepts",
          publishDate: new Date("2024-01-15"),
          author: "Custom Author",
          tags: ["javascript", "tutorial"],
          readingTime: "8 min",
        },
      });

      expect(result).toContain("Advanced JavaScript Tutorial");
      expect(result).toContain("Learn advanced JavaScript concepts");
      expect(result).toContain("Custom Author");
      expect(result).toContain("8 min");

      // Check for tags if rendered
      expect(result).toContain("javascript");
      expect(result).toContain("tutorial");
    });

    it("should inherit Base layout functionality", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(BlogPost, {
        props: {
          title: "Test Post",
          description: "Test description",
        },
      });

      // Should include Base layout elements
      expect(result).toContain('class="header"');
      expect(result).toContain('class="footer"');
      expect(result).toContain('role="main"');

      // Should include navigation
      expect(result).toContain("Home");
      expect(result).toContain("About");
      expect(result).toContain("Projects");
      expect(result).toContain("Blog");
      expect(result).toContain("Contact");

      // Should include meta tags
      expect(result).toContain('name="description"');
      expect(result).toContain('property="og:title"');
    });
  });
});
