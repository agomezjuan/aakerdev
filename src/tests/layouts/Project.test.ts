import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Project from "../../layouts/Project.astro";

describe("Project Layout Component", () => {
  describe("Props Validation", () => {
    it("should validate project metadata", () => {
      const projectProps = {
        title: "My Project",
        description: "A cool project",
        technologies: ["React", "TypeScript", "Astro"],
        status: "completed" as const,
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-12-31"),
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/user/repo",
      };

      expect(projectProps.title).toBeDefined();
      expect(projectProps.description).toBeDefined();
      expect(Array.isArray(projectProps.technologies)).toBe(true);
      expect(["completed", "in-progress", "archived"]).toContain(
        projectProps.status,
      );
      expect(projectProps.startDate).toBeInstanceOf(Date);
      expect(projectProps.endDate).toBeInstanceOf(Date);
      expect(projectProps.liveUrl).toMatch(/^https?:\/\//);
      expect(projectProps.githubUrl).toMatch(/^https:\/\/github\.com/);
    });

    it("should validate required props", () => {
      const minimalProps = {
        title: "Test Project",
        description: "Test description",
      };

      expect(minimalProps.title).toBeDefined();
      expect(minimalProps.description).toBeDefined();
      expect(typeof minimalProps.title).toBe("string");
      expect(typeof minimalProps.description).toBe("string");
    });

    it("should handle optional project-specific props", () => {
      const optionalProps = {
        technologies: ["JavaScript", "Node.js"],
        liveUrl: "https://myproject.com",
        githubUrl: "https://github.com/user/project",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-06-01"),
        status: "in-progress" as const,
        role: "Full-Stack Developer",
        team: "Solo Project",
      };

      if (optionalProps.technologies) {
        expect(Array.isArray(optionalProps.technologies)).toBe(true);
        expect(optionalProps.technologies.length).toBeGreaterThan(0);
      }
      if (optionalProps.liveUrl) {
        expect(optionalProps.liveUrl).toMatch(/^https?:\/\//);
      }
      if (optionalProps.githubUrl) {
        expect(optionalProps.githubUrl).toMatch(/^https:\/\/github\.com/);
      }
      if (optionalProps.startDate) {
        expect(optionalProps.startDate).toBeInstanceOf(Date);
      }
      if (optionalProps.endDate) {
        expect(optionalProps.endDate).toBeInstanceOf(Date);
      }
      if (optionalProps.status) {
        expect(["completed", "in-progress", "archived"]).toContain(
          optionalProps.status,
        );
      }
      if (optionalProps.role) {
        expect(typeof optionalProps.role).toBe("string");
      }
      if (optionalProps.team) {
        expect(typeof optionalProps.team).toBe("string");
      }
    });

    it("should generate status styles", () => {
      const getStatusStyle = (status: string) => {
        switch (status) {
          case "completed":
            return "background: #dcfce7; color: #166534;";
          case "in-progress":
            return "background: #fef3c7; color: #92400e;";
          case "archived":
            return "background: #f3f4f6; color: #6b7280;";
          default:
            return "background: #f3f4f6; color: #6b7280;";
        }
      };

      expect(getStatusStyle("completed")).toContain("background: #dcfce7");
      expect(getStatusStyle("in-progress")).toContain("background: #fef3c7");
      expect(getStatusStyle("archived")).toContain("background: #f3f4f6");
      expect(getStatusStyle("unknown")).toContain("background: #f3f4f6");
    });
  });

  describe("Date Formatting", () => {
    it("should format project dates correctly", () => {
      const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
        }).format(date);
      };

      const testDate = new Date("2024-01-15");
      expect(formatDate(testDate)).toBe("Jan 2024");

      const anotherDate = new Date("2023-12-31");
      expect(formatDate(anotherDate)).toBe("Dec 2023");
    });

    it("should handle different timeline scenarios", () => {
      const generateTimeline = (startDate?: Date, endDate?: Date) => {
        if (!startDate && !endDate) return "";
        if (startDate && !endDate)
          return `${startDate.getFullYear()} - Present`;
        if (!startDate && endDate) return `Until ${endDate.getFullYear()}`;
        if (startDate && endDate)
          return `${startDate.getFullYear()} - ${endDate.getFullYear()}`;
        return "";
      };

      const testStartDate = new Date("2023-01-01");
      const testEndDate = new Date("2024-12-31");
      const testEndDate2 = new Date("2024-01-01");

      expect(generateTimeline()).toBe("");
      expect(generateTimeline(testStartDate)).toBe(
        `${testStartDate.getFullYear()} - Present`,
      );
      expect(generateTimeline(undefined, testEndDate)).toBe(
        `Until ${testEndDate.getFullYear()}`,
      );
      expect(generateTimeline(testStartDate, testEndDate2)).toBe(
        `${testStartDate.getFullYear()} - ${testEndDate2.getFullYear()}`,
      );
    });
  });

  describe("Technology Validation", () => {
    it("should validate technology tags", () => {
      const isValidTechnology = (tech: string) => {
        return (
          typeof tech === "string" &&
          tech.length >= 2 &&
          tech.length <= 30 &&
          tech.trim() === tech
        );
      };

      const validTechs = [
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Docker",
      ];
      const invalidTechs = [
        "",
        "A",
        "TooLongTechnologyNameThatExceedsLimit",
        "  Spaces  ",
      ];

      validTechs.forEach((tech) => {
        expect(isValidTechnology(tech)).toBe(true);
      });

      invalidTechs.forEach((tech) => {
        expect(isValidTechnology(tech)).toBe(false);
      });
    });

    it("should handle technology arrays", () => {
      const technologies = ["JavaScript", "React", "Node.js", "MongoDB"];

      expect(Array.isArray(technologies)).toBe(true);
      expect(technologies.length).toBe(4);

      technologies.forEach((tech) => {
        expect(typeof tech).toBe("string");
        expect(tech.length).toBeGreaterThan(0);
      });
    });
  });

  describe("URL Validation", () => {
    it("should validate live URLs", () => {
      const isValidLiveUrl = (url: string) => {
        try {
          new URL(url);
          return url.startsWith("http://") || url.startsWith("https://");
        } catch {
          return false;
        }
      };

      const validUrls = [
        "https://myproject.com",
        "http://localhost:3000",
        "https://subdomain.example.com",
        "https://project.netlify.app",
      ];

      const invalidUrls = [
        "not-a-url",
        "ftp://example.com",
        "mailto:test@example.com",
        "",
      ];

      validUrls.forEach((url) => {
        expect(isValidLiveUrl(url)).toBe(true);
      });

      invalidUrls.forEach((url) => {
        expect(isValidLiveUrl(url)).toBe(false);
      });
    });

    it("should validate GitHub URLs", () => {
      const isValidGithubUrl = (url: string) => {
        return url.startsWith("https://github.com/") && url.length > 19;
      };

      const validGithubUrls = [
        "https://github.com/user/repo",
        "https://github.com/organization/project-name",
        "https://github.com/user/repo-with-dashes",
      ];

      const invalidGithubUrls = [
        "https://gitlab.com/user/repo",
        "http://github.com/user/repo",
        "https://github.com/",
        "not-a-url",
      ];

      validGithubUrls.forEach((url) => {
        expect(isValidGithubUrl(url)).toBe(true);
      });

      invalidGithubUrls.forEach((url) => {
        expect(isValidGithubUrl(url)).toBe(false);
      });
    });
  });

  describe("Project Status", () => {
    it("should validate project status values", () => {
      const validStatuses = ["completed", "in-progress", "archived"];
      const invalidStatuses = ["pending", "draft", "unknown", "", undefined];

      validStatuses.forEach((status) => {
        expect(validStatuses).toContain(status);
      });

      invalidStatuses.forEach((status) => {
        expect(validStatuses).not.toContain(status);
      });
    });

    it("should format status display text", () => {
      const formatStatus = (status: string) => {
        return status.replace("-", " ");
      };

      expect(formatStatus("completed")).toBe("completed");
      expect(formatStatus("in-progress")).toBe("in progress");
      expect(formatStatus("archived")).toBe("archived");
    });
  });

  describe("SEO and Meta Tags", () => {
    it("should generate project-specific meta tags", () => {
      const projectMeta = {
        type: "website",
        technologies: ["React", "TypeScript"],
        projectType: "Web Application",
        featured: true,
      };

      expect(projectMeta.type).toBe("website");
      expect(Array.isArray(projectMeta.technologies)).toBe(true);
      expect(typeof projectMeta.projectType).toBe("string");
      expect(typeof projectMeta.featured).toBe("boolean");
    });

    it("should validate structured data for projects", () => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: "Test Project",
        description: "Test description",
        author: {
          "@type": "Person",
          name: "AakerDev",
        },
        dateCreated: "2024-01-01",
        programmingLanguage: ["JavaScript", "TypeScript"],
      };

      expect(structuredData["@context"]).toBe("https://schema.org");
      expect(structuredData["@type"]).toBe("CreativeWork");
      expect(structuredData.name).toBeDefined();
      expect(structuredData.description).toBeDefined();
      expect(structuredData.author["@type"]).toBe("Person");
      expect(Array.isArray(structuredData.programmingLanguage)).toBe(true);
    });
  });

  describe("Navigation and Links", () => {
    it("should provide project navigation", () => {
      const projectNavigation = {
        backToProjects: { title: "All Projects", href: "/projects" },
        contact: { title: "Get in Touch", href: "/contact" },
        previousProject: null,
        nextProject: null,
      };

      expect(projectNavigation.backToProjects.href).toBe("/projects");
      expect(projectNavigation.contact.href).toBe("/contact");
      expect(projectNavigation.backToProjects.title).toBe("All Projects");
      expect(projectNavigation.contact.title).toBe("Get in Touch");
    });

    it("should handle external project links", () => {
      const projectLinks = [
        {
          type: "live",
          url: "https://myproject.com",
          text: "View Live Project",
        },
        {
          type: "github",
          url: "https://github.com/user/repo",
          text: "View Source Code",
        },
      ];

      projectLinks.forEach((link) => {
        expect(link.url).toMatch(/^https:\/\//);
        expect(link.text).toBeDefined();
        expect(["live", "github", "demo", "docs"].includes(link.type)).toBe(
          true,
        );
      });
    });
  });

  describe("Astro Component Rendering", () => {
    it("should render Project component with minimal props", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Project, {
        props: {
          title: "Test Project",
          description: "Test project description",
        },
      });

      // Check that the component renders with the correct title
      expect(result).toContain("Test Project");
      expect(result).toContain("Test project description");

      // Check for key structural elements
      expect(result).toContain('class="project-title"');
      expect(result).toContain('class="project-description"');
      expect(result).toContain('class="project-header"');
      expect(result).toContain('class="project-footer"');

      // Check that it includes the base layout elements
      expect(result).toContain("AakerDev");
      expect(result).toContain("nav-link");

      // Check for project navigation
      expect(result).toContain("All Projects");
      expect(result).toContain("Get in Touch");
    });

    it("should render with complete project metadata", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Project, {
        props: {
          title: "Advanced Web App",
          description: "A comprehensive web application",
          technologies: ["React", "TypeScript", "Node.js"],
          status: "completed" as const,
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-06-01"),
          role: "Full-Stack Developer",
          team: "3 developers",
          liveUrl: "https://example.com",
          githubUrl: "https://github.com/user/project",
        },
      });

      expect(result).toContain("Advanced Web App");
      expect(result).toContain("A comprehensive web application");

      // Check for technologies
      expect(result).toContain("React");
      expect(result).toContain("TypeScript");
      expect(result).toContain("Node.js");

      // Check for status
      expect(result).toContain("completed");

      // Check for role and team
      expect(result).toContain("Full-Stack Developer");
      expect(result).toContain("3 developers");

      // Check for project links
      expect(result).toContain("View Live Project");
      expect(result).toContain("View Source Code");
    });

    it("should inherit Base layout functionality", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Project, {
        props: {
          title: "Test Project",
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

    it("should handle optional props gracefully", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Project, {
        props: {
          title: "Minimal Project",
          description: "Minimal description",
          // No optional props provided
        },
      });

      // Should still render basic structure
      expect(result).toContain("Minimal Project");
      expect(result).toContain("Minimal description");
      expect(result).toContain('class="project-title"');

      // Should not break without optional props
      expect(result).not.toContain("undefined");
      expect(result).not.toContain("null");
    });

    it("should render project status with correct styling", async () => {
      const statuses = ["completed", "in-progress", "archived"] as const;

      for (const status of statuses) {
        const container = await AstroContainer.create();
        const result = await container.renderToString(Project, {
          props: {
            title: "Test Project",
            description: "Test description",
            status,
          },
        });

        expect(result).toContain(status.replace("-", " "));
        expect(result).toContain('class="project-status"');
      }
    });
  });
});
