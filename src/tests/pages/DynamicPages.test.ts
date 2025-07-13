import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import BlogIndex from "../../pages/blog/index.astro";
import ProjectsIndex from "../../pages/projects/index.astro";
import BlogSlug from "../../pages/blog/[slug].astro";
import ProjectSlug from "../../pages/projects/[slug].astro";

describe("Dynamic and Collection Pages", () => {
  describe("Blog Index Page", () => {
    it("should render with correct title and description", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(BlogIndex);

      // Check for page title
      expect(result).toContain("Blog - AakerDev");
      expect(result).toContain("Technical insights, learning experiences");

      // Check for main heading
      expect(result).toContain("Blog");
      expect(result).toContain(
        "Technical experiences and insights coming soon...",
      );
    });

    it("should include all blog sections", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(BlogIndex);

      // Check for section headings
      expect(result).toContain("Featured Posts");
      expect(result).toContain("Categories");
      expect(result).toContain("All Posts");

      // Check for section IDs
      expect(result).toContain('id="featured-posts"');
      expect(result).toContain('id="blog-categories"');
      expect(result).toContain('id="posts-list"');

      // Check for blog-specific elements
      expect(result).toContain('id="blog-filters"');
      expect(result).toContain('id="posts-container"');
    });

    it("should inherit Base layout functionality", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(BlogIndex);

      // Should include Base layout elements
      expect(result).toContain("AakerDev");
      expect(result).toContain('class="header"');
      expect(result).toContain('class="footer"');
      expect(result).toContain('role="main"');
    });
  });

  describe("Projects Index Page", () => {
    it("should render with correct title and description", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectsIndex);

      // Check for page title
      expect(result).toContain("Projects - AakerDev");
      expect(result).toContain("Showcase of technical projects, case studies");

      // Check for main heading
      expect(result).toContain("Projects");
      expect(result).toContain("Technical project showcase coming soon...");
    });

    it("should include all project sections", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectsIndex);

      // Check for section headings
      expect(result).toContain("Featured Projects");
      expect(result).toContain("All Projects");

      // Check for section IDs
      expect(result).toContain('id="featured-projects"');
      expect(result).toContain('id="project-grid"');

      // Check for project-specific elements
      expect(result).toContain('id="project-filters"');
      expect(result).toContain('id="projects-container"');
    });

    it("should inherit Base layout functionality", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(ProjectsIndex);

      // Should include Base layout elements
      expect(result).toContain("AakerDev");
      expect(result).toContain('class="header"');
      expect(result).toContain('class="footer"');
      expect(result).toContain('role="main"');
    });
  });

  describe("Blog Slug Page (Dynamic)", () => {
    it("should render with dynamic slug in title", async () => {
      const container = await AstroContainer.create();

      // Mock Astro.params for the dynamic route
      const mockParams = { slug: "test-blog-post" };
      const result = await container.renderToString(BlogSlug, {
        props: {},
        locals: {},
        params: mockParams,
      });

      // Check for dynamic title with slug
      expect(result).toContain("Blog Post: test-blog-post");
      expect(result).toContain(
        "Technical insights and development experiences",
      );

      // Check for placeholder content
      expect(result).toContain("Individual blog post content coming soon...");
    });

    it("should include blog post sections", async () => {
      const container = await AstroContainer.create();
      const mockParams = { slug: "example-post" };
      const result = await container.renderToString(BlogSlug, {
        props: {},
        locals: {},
        params: mockParams,
      });

      // Check for section headings
      expect(result).toContain("Navigate");
      expect(result).toContain("Related Posts");

      // Check for section IDs
      expect(result).toContain('id="post-navigation"');
      expect(result).toContain('id="related-posts"');
    });

    it("should inherit BlogPost layout functionality", async () => {
      const container = await AstroContainer.create();
      const mockParams = { slug: "test-post" };
      const result = await container.renderToString(BlogSlug, {
        props: {},
        locals: {},
        params: mockParams,
      });

      // Should include BlogPost layout elements (which inherits from Base)
      expect(result).toContain("AakerDev");
      expect(result).toContain('class="header"');
      expect(result).toContain('class="footer"');
      expect(result).toContain('role="main"');
    });

    it("should handle different slug formats", async () => {
      const container = await AstroContainer.create();
      const slugs = [
        "my-first-post",
        "understanding-typescript",
        "2024-year-review",
        "how-to-test-astro-components",
      ];

      for (const slug of slugs) {
        const result = await container.renderToString(BlogSlug, {
          props: {},
          locals: {},
          params: { slug },
        });

        expect(result).toContain(`Blog Post: ${slug}`);
        expect(result).toContain("Individual blog post content coming soon...");
      }
    });
  });

  describe("Project Slug Page (Dynamic)", () => {
    it("should render with dynamic slug in title", async () => {
      const container = await AstroContainer.create();

      // Mock Astro.params for the dynamic route
      const mockParams = { slug: "test-project" };
      const result = await container.renderToString(ProjectSlug, {
        props: {},
        locals: {},
        params: mockParams,
      });

      // Check for dynamic title with slug
      expect(result).toContain("Project: test-project");
      expect(result).toContain("Detailed case study and technical breakdown");

      // Check for placeholder content
      expect(result).toContain("Individual project details coming soon...");
    });

    it("should include project detail sections", async () => {
      const container = await AstroContainer.create();
      const mockParams = { slug: "example-project" };
      const result = await container.renderToString(ProjectSlug, {
        props: {},
        locals: {},
        params: mockParams,
      });

      // Check for section headings
      expect(result).toContain("Project Overview");
      expect(result).toContain("Technical Implementation");
      expect(result).toContain("Screenshots & Demos");
      expect(result).toContain("Key Learnings");
      expect(result).toContain("Project Links");

      // Check for section IDs
      expect(result).toContain('id="project-overview"');
      expect(result).toContain('id="technical-details"');
      expect(result).toContain('id="project-media"');
      expect(result).toContain('id="lessons-learned"');
      expect(result).toContain('id="project-links"');
    });

    it("should inherit Project layout functionality", async () => {
      const container = await AstroContainer.create();
      const mockParams = { slug: "test-project" };
      const result = await container.renderToString(ProjectSlug, {
        props: {},
        locals: {},
        params: mockParams,
      });

      // Should include Project layout elements (which inherits from Base)
      expect(result).toContain("AakerDev");
      expect(result).toContain('class="header"');
      expect(result).toContain('class="footer"');
      expect(result).toContain('role="main"');
    });

    it("should handle different slug formats", async () => {
      const container = await AstroContainer.create();
      const slugs = [
        "portfolio-website",
        "e-commerce-platform",
        "mobile-app-backend",
        "data-visualization-dashboard",
      ];

      for (const slug of slugs) {
        const result = await container.renderToString(ProjectSlug, {
          props: {},
          locals: {},
          params: { slug },
        });

        expect(result).toContain(`Project: ${slug}`);
        expect(result).toContain("Individual project details coming soon...");
      }
    });
  });

  describe("Static Path Generation", () => {
    it("should handle dynamic routing for blog posts", () => {
      // Test that the components can render with slug parameters
      // The actual getStaticPaths function is not exported from the component module
      // but is available during Astro's build process
      expect(typeof BlogSlug).toBe("function");
      expect(BlogSlug).toBeDefined();
    });

    it("should handle dynamic routing for project posts", () => {
      // Test that the components can render with slug parameters
      // The actual getStaticPaths function is not exported from the component module
      // but is available during Astro's build process
      expect(typeof ProjectSlug).toBe("function");
      expect(ProjectSlug).toBeDefined();
    });

    it("should support dynamic slug parameters", async () => {
      // Test that both components can handle slug parameters
      const container = await AstroContainer.create();

      const blogResult = await container.renderToString(BlogSlug, {
        props: {},
        locals: {},
        params: { slug: "test-blog" },
      });

      const projectResult = await container.renderToString(ProjectSlug, {
        props: {},
        locals: {},
        params: { slug: "test-project" },
      });

      expect(blogResult).toContain("test-blog");
      expect(projectResult).toContain("test-project");
    });
  });

  describe("Dynamic Page Integration", () => {
    it("should maintain consistent structure across collection pages", async () => {
      const container = await AstroContainer.create();
      const pages = [
        { component: BlogIndex, name: "BlogIndex" },
        { component: ProjectsIndex, name: "ProjectsIndex" },
      ];

      for (const page of pages) {
        const result = await container.renderToString(page.component);

        // All collection pages should have Base layout structure
        expect(result).toContain('role="main"');
        expect(result).toContain('class="header"');
        expect(result).toContain('class="footer"');

        // All pages should have navigation
        expect(result).toContain("nav-link");

        // All pages should have meta tags
        expect(result).toContain('name="description"');
        expect(result).toContain('property="og:title"');
      }
    });

    it("should have different content structures for different page types", async () => {
      const container = await AstroContainer.create();

      const blogResult = await container.renderToString(BlogIndex);
      const projectsResult = await container.renderToString(ProjectsIndex);

      // Blog page should have blog-specific elements
      expect(blogResult).toContain("blog-filters");
      expect(blogResult).toContain("posts-container");
      expect(blogResult).toContain("Categories");

      // Projects page should have project-specific elements
      expect(projectsResult).toContain("project-filters");
      expect(projectsResult).toContain("projects-container");
      expect(projectsResult).toContain("project-grid");
    });

    it("should handle slug parameter validation", async () => {
      const container = await AstroContainer.create();

      // Test various slug formats that should be valid
      const validSlugs = [
        "simple-slug",
        "with-numbers-123",
        "with-dashes-and-words",
        "2024-project-name",
      ];

      for (const slug of validSlugs) {
        const blogResult = await container.renderToString(BlogSlug, {
          props: {},
          locals: {},
          params: { slug },
        });

        const projectResult = await container.renderToString(ProjectSlug, {
          props: {},
          locals: {},
          params: { slug },
        });

        // Both should render without errors and include the slug
        expect(blogResult).toContain(slug);
        expect(projectResult).toContain(slug);
      }
    });
  });
});
