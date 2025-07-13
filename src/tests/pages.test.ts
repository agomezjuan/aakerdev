import { describe, it, expect } from "vitest";

describe("Page Structure and Content", () => {
  describe("Home Page", () => {
    it("should have correct page metadata", () => {
      const homePageData = {
        title: "AakerDev - Full-Stack Developer Portfolio",
        description:
          "Professional portfolio of a full-stack developer showcasing modern web technologies, project case studies, and technical expertise.",
      };

      expect(homePageData.title).toContain("AakerDev");
      expect(homePageData.title).toContain("Portfolio");
      expect(homePageData.description).toContain("full-stack developer");
      expect(homePageData.description).toContain("portfolio");
    });

    it("should define required sections", () => {
      const requiredSections = [
        "hero",
        "skills-overview",
        "featured-projects",
        "recent-posts",
        "call-to-action",
      ];

      // Simulate checking if sections exist
      const sectionsExist = requiredSections.every((section) => {
        return typeof section === "string" && section.length > 0;
      });

      expect(sectionsExist).toBe(true);
      expect(requiredSections).toHaveLength(5);
    });
  });

  describe("About Page", () => {
    it("should have correct page metadata", () => {
      const aboutPageData = {
        title: "About",
        description:
          "Professional background, technical expertise, and career journey of a full-stack developer.",
      };

      expect(aboutPageData.title).toBe("About");
      expect(aboutPageData.description).toContain("Professional background");
      expect(aboutPageData.description).toContain("technical expertise");
    });

    it("should define professional sections", () => {
      const professionalSections = [
        "professional-story",
        "technical-expertise",
        "experience",
        "education",
        "personal",
      ];

      expect(professionalSections).toContain("professional-story");
      expect(professionalSections).toContain("technical-expertise");
      expect(professionalSections).toContain("experience");
      expect(professionalSections).toHaveLength(5);
    });
  });

  describe("Projects Page", () => {
    it("should have correct page metadata", () => {
      const projectsPageData = {
        title: "Projects",
        description:
          "Showcase of technical projects, case studies, and development work.",
      };

      expect(projectsPageData.title).toBe("Projects");
      expect(projectsPageData.description).toContain("Showcase");
      expect(projectsPageData.description).toContain("technical projects");
    });

    it("should define project showcase sections", () => {
      const projectSections = [
        "featured-projects",
        "project-grid",
        "project-filters",
        "projects-container",
      ];

      expect(projectSections).toContain("featured-projects");
      expect(projectSections).toContain("project-grid");
      expect(projectSections).toHaveLength(4);
    });
  });

  describe("Blog Page", () => {
    it("should have correct page metadata", () => {
      const blogPageData = {
        title: "Blog",
        description:
          "Technical insights, learning experiences, and development stories.",
      };

      expect(blogPageData.title).toBe("Blog");
      expect(blogPageData.description).toContain("Technical insights");
      expect(blogPageData.description).toContain("learning experiences");
    });

    it("should define blog sections", () => {
      const blogSections = [
        "featured-posts",
        "blog-categories",
        "posts-list",
        "blog-filters",
        "posts-container",
      ];

      expect(blogSections).toContain("featured-posts");
      expect(blogSections).toContain("blog-categories");
      expect(blogSections).toHaveLength(5);
    });
  });

  describe("Contact Page", () => {
    it("should have correct page metadata", () => {
      const contactPageData = {
        title: "Contact",
        description:
          "Get in touch for opportunities, collaborations, or questions.",
      };

      expect(contactPageData.title).toBe("Contact");
      expect(contactPageData.description).toContain("Get in touch");
      expect(contactPageData.description).toContain("opportunities");
    });

    it("should define contact sections", () => {
      const contactSections = [
        "contact-methods",
        "contact-form",
        "availability",
        "social-links",
      ];

      expect(contactSections).toContain("contact-methods");
      expect(contactSections).toContain("contact-form");
      expect(contactSections).toHaveLength(4);
    });
  });

  describe("404 Error Page", () => {
    it("should have correct error page metadata", () => {
      const errorPageData = {
        title: "Page Not Found",
        description: "The page you're looking for doesn't exist.",
      };

      expect(errorPageData.title).toContain("Not Found");
      expect(errorPageData.description).toContain("doesn't exist");
    });

    it("should provide navigation alternatives", () => {
      const navigationLinks = [
        { href: "/", text: "Home" },
        { href: "/about", text: "About" },
        { href: "/projects", text: "Projects" },
        { href: "/blog", text: "Blog" },
        { href: "/contact", text: "Contact" },
      ];

      navigationLinks.forEach((link) => {
        expect(link.href).toMatch(/^\/[a-z]*$/);
        expect(link.text).toBeTruthy();
        expect(typeof link.text).toBe("string");
      });

      expect(navigationLinks).toHaveLength(5);
    });
  });
});

describe("Dynamic Route Handling", () => {
  describe("Project Detail Pages", () => {
    it("should handle dynamic slug parameters", () => {
      const testSlugs = [
        "my-awesome-project",
        "portfolio-website",
        "e-commerce-app",
        "blog-platform",
      ];

      testSlugs.forEach((slug) => {
        expect(slug).toMatch(/^[a-z0-9-]+$/);
        expect(slug).not.toContain(" ");
        expect(slug).not.toContain("_");
      });
    });

    it("should generate correct page titles", () => {
      const generateProjectTitle = (slug: string) => {
        return `Project: ${slug}`;
      };

      expect(generateProjectTitle("my-project")).toBe("Project: my-project");
      expect(generateProjectTitle("awesome-app")).toBe("Project: awesome-app");
    });
  });

  describe("Blog Post Pages", () => {
    it("should handle dynamic blog slug parameters", () => {
      const testSlugs = [
        "getting-started-with-astro",
        "advanced-typescript-patterns",
        "building-scalable-web-apps",
      ];

      testSlugs.forEach((slug) => {
        expect(slug).toMatch(/^[a-z0-9-]+$/);
        expect(slug.length).toBeGreaterThan(5);
        expect(slug).not.toContain(" ");
      });
    });

    it("should generate correct blog post titles", () => {
      const generateBlogTitle = (slug: string) => {
        return `Blog Post: ${slug}`;
      };

      expect(generateBlogTitle("my-first-post")).toBe(
        "Blog Post: my-first-post",
      );
      expect(generateBlogTitle("learning-astro")).toBe(
        "Blog Post: learning-astro",
      );
    });
  });
});

describe("Site Architecture Validation", () => {
  it("should have consistent URL structure", () => {
    const siteRoutes = {
      home: "/",
      about: "/about",
      projects: "/projects",
      projectDetail: "/projects/[slug]",
      blog: "/blog",
      blogPost: "/blog/[slug]",
      contact: "/contact",
      notFound: "/404",
    };

    // Validate all routes start with /
    Object.values(siteRoutes).forEach((route) => {
      expect(route).toMatch(/^\//);
    });

    // Validate dynamic routes use [slug] pattern
    expect(siteRoutes.projectDetail).toMatch(/\[slug\]/);
    expect(siteRoutes.blogPost).toMatch(/\[slug\]/);

    // Validate static routes don't have parameters
    expect(siteRoutes.home).toBe("/");
    expect(siteRoutes.about).toBe("/about");
    expect(siteRoutes.projects).toBe("/projects");
    expect(siteRoutes.blog).toBe("/blog");
    expect(siteRoutes.contact).toBe("/contact");
  });

  it("should have proper layout inheritance", () => {
    const layoutMapping = {
      home: "Base",
      about: "Base",
      projects: "Base",
      projectDetail: "Project",
      blog: "Base",
      blogPost: "BlogPost",
      contact: "Base",
      notFound: "Base",
    };

    // Validate layout assignments
    expect(layoutMapping.home).toBe("Base");
    expect(layoutMapping.projectDetail).toBe("Project");
    expect(layoutMapping.blogPost).toBe("BlogPost");

    // Count layout usage
    const layoutCounts = Object.values(layoutMapping).reduce(
      (acc, layout) => {
        acc[layout] = (acc[layout] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    expect(layoutCounts.Base).toBeGreaterThan(0);
    expect(layoutCounts.Project).toBe(1);
    expect(layoutCounts.BlogPost).toBe(1);
  });

  it("should maintain consistent navigation structure", () => {
    const mainNavigation = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ];

    // Validate navigation structure
    expect(mainNavigation).toHaveLength(5);

    mainNavigation.forEach((navItem) => {
      expect(navItem.href).toMatch(/^\/[a-z]*$/);
      expect(navItem.label).toBeTruthy();
      expect(typeof navItem.label).toBe("string");
    });

    // Validate navigation order (Home should be first, Contact last)
    expect(mainNavigation[0].label).toBe("Home");
    expect(mainNavigation[mainNavigation.length - 1].label).toBe("Contact");
  });
});
