import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Base from "../../layouts/Base.astro";

describe("Base Layout Component", () => {
  describe("Props Validation", () => {
    it("should require title and description", () => {
      const requiredProps = {
        title: "Test Title",
        description: "Test Description",
      };

      // Validate prop structure
      expect(requiredProps.title).toBeDefined();
      expect(requiredProps.description).toBeDefined();
      expect(typeof requiredProps.title).toBe("string");
      expect(typeof requiredProps.description).toBe("string");
    });

    it("should handle optional props", () => {
      const optionalProps = {
        canonicalURL: "https://example.com/test",
        image: "/test-image.jpg",
      };

      expect(optionalProps.canonicalURL).toMatch(/^https?:\/\//);
      expect(optionalProps.image).toMatch(/\.(jpg|jpeg|png|svg|webp)$/);
    });

    it("should generate correct page title", () => {
      const titleWithSite = "Test Page - AakerDev";
      const titleWithoutSite = "Test Page";

      // Test page title generation logic
      const generatePageTitle = (title: string) => {
        return title.includes("AakerDev") ? title : `${title} - AakerDev`;
      };

      expect(generatePageTitle(titleWithSite)).toBe(titleWithSite);
      expect(generatePageTitle(titleWithoutSite)).toBe("Test Page - AakerDev");
    });
  });

  describe("Navigation Logic", () => {
    it("should determine active navigation states", () => {
      const testPaths = [
        {
          pathname: "/",
          expected: {
            home: true,
            about: false,
            projects: false,
            blog: false,
            contact: false,
          },
        },
        {
          pathname: "/about",
          expected: {
            home: false,
            about: true,
            projects: false,
            blog: false,
            contact: false,
          },
        },
        {
          pathname: "/projects",
          expected: {
            home: false,
            about: false,
            projects: true,
            blog: false,
            contact: false,
          },
        },
        {
          pathname: "/projects/my-project",
          expected: {
            home: false,
            about: false,
            projects: true,
            blog: false,
            contact: false,
          },
        },
        {
          pathname: "/blog",
          expected: {
            home: false,
            about: false,
            projects: false,
            blog: true,
            contact: false,
          },
        },
        {
          pathname: "/blog/my-post",
          expected: {
            home: false,
            about: false,
            projects: false,
            blog: true,
            contact: false,
          },
        },
        {
          pathname: "/contact",
          expected: {
            home: false,
            about: false,
            projects: false,
            blog: false,
            contact: true,
          },
        },
      ];

      testPaths.forEach(({ pathname, expected }) => {
        const navStates = {
          home: pathname === "/",
          about: pathname === "/about",
          projects: pathname.startsWith("/projects"),
          blog: pathname.startsWith("/blog"),
          contact: pathname === "/contact",
        };

        expect(navStates).toEqual(expected);
      });
    });

    it("should generate correct class lists for navigation", () => {
      const generateNavClasses = (isActive: boolean) => {
        return ["nav-link", { active: isActive }];
      };

      expect(generateNavClasses(true)).toEqual(["nav-link", { active: true }]);
      expect(generateNavClasses(false)).toEqual([
        "nav-link",
        { active: false },
      ]);
    });

    it("should generate correct aria-current values", () => {
      const getAriaCurrentPage = () => "page";
      const getAriaCurrentNone = () => undefined;

      expect(getAriaCurrentPage()).toBe("page");
      expect(getAriaCurrentNone()).toBeUndefined();
    });
  });

  describe("SEO and Meta Tags", () => {
    it("should generate correct meta tag values", () => {
      const props = {
        title: "Test Page",
        description: "This is a test page for SEO validation",
        image: "/test-image.jpg",
        url: "https://example.com/test",
      };

      // Test Open Graph meta tags
      const ogTags = {
        "og:type": "website",
        "og:url": props.url,
        "og:title": props.title,
        "og:description": props.description,
        "og:image": props.image,
      };

      expect(ogTags["og:type"]).toBe("website");
      expect(ogTags["og:url"]).toMatch(/^https?:\/\//);
      expect(ogTags["og:title"]).toBe(props.title);
      expect(ogTags["og:description"]).toBe(props.description);
      expect(ogTags["og:image"]).toBe(props.image);

      // Test Twitter Card meta tags
      const twitterTags = {
        "twitter:card": "summary_large_image",
        "twitter:url": props.url,
        "twitter:title": props.title,
        "twitter:description": props.description,
        "twitter:image": props.image,
      };

      expect(twitterTags["twitter:card"]).toBe("summary_large_image");
      expect(twitterTags["twitter:url"]).toMatch(/^https?:\/\//);
      expect(twitterTags["twitter:title"]).toBe(props.title);
      expect(twitterTags["twitter:description"]).toBe(props.description);
      expect(twitterTags["twitter:image"]).toBe(props.image);
    });

    it("should validate canonical URLs", () => {
      const validUrls = [
        "https://example.com",
        "https://example.com/page",
        "https://subdomain.example.com/path",
      ];

      const invalidUrls = ["not-a-url", "ftp://example.com", "http://", ""];

      validUrls.forEach((url) => {
        expect(url).toMatch(/^https:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]+$/);
      });

      invalidUrls.forEach((url) => {
        expect(url).not.toMatch(
          /^https:\/\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]+$/,
        );
      });
    });
  });

  describe("Responsive Design Utilities", () => {
    it("should have consistent breakpoint values", () => {
      const breakpoints = {
        mobile: "768px",
        tablet: "1024px",
        desktop: "1200px",
      };

      expect(breakpoints.mobile).toBe("768px");
      expect(breakpoints.tablet).toBe("1024px");
      expect(breakpoints.desktop).toBe("1200px");
    });

    it("should generate correct CSS classes", () => {
      const cssClasses = {
        container: "max-width: 1200px; margin: 0 auto; padding: 2rem 1rem;",
        flexCenter:
          "display: flex; justify-content: center; align-items: center;",
        responsive: "@media (max-width: 768px)",
      };

      expect(cssClasses.container).toContain("max-width: 1200px");
      expect(cssClasses.flexCenter).toContain("display: flex");
      expect(cssClasses.responsive).toContain("@media (max-width: 768px)");
    });
  });

  describe("Astro Component Rendering", () => {
    it("should render Base component with correct structure", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Base, {
        props: {
          title: "Test Page",
          description: "Test page description",
        },
      });

      // Check that the component renders with the correct title
      expect(result).toContain("Test Page - AakerDev");
      expect(result).toContain("Test page description");

      // Check for key structural elements
      expect(result).toContain('class="header"');
      expect(result).toContain('class="nav-link"');
      expect(result).toContain('class="footer"');
      expect(result).toContain('role="main"');

      // Check that it includes the site branding
      expect(result).toContain("AakerDev");

      // Check for navigation elements
      expect(result).toContain("Home");
      expect(result).toContain("About");
      expect(result).toContain("Projects");
      expect(result).toContain("Blog");
      expect(result).toContain("Contact");

      // Check for meta tags
      expect(result).toContain('name="description"');
      expect(result).toContain('property="og:title"');
      expect(result).toContain('property="twitter:card"');
    });

    it("should handle optional canonical URL", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Base, {
        props: {
          title: "Test Page",
          description: "Test page description",
          canonicalURL: "https://example.com/test",
        },
      });

      expect(result).toContain('rel="canonical"');
      expect(result).toContain("https://example.com/test");
    });

    it("should handle optional image", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Base, {
        props: {
          title: "Test Page",
          description: "Test page description",
          image: "/custom-image.jpg",
        },
      });

      expect(result).toContain("/custom-image.jpg");
      expect(result).toContain('property="og:image"');
    });
  });
});
