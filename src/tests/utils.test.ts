import { describe, it, expect } from "vitest";

describe("URL and Routing Utilities", () => {
  describe("Slug Generation", () => {
    it("should generate valid slugs from titles", () => {
      const generateSlug = (title: string): string => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/(^-)|(-$)/g, "");
      };

      const testCases = [
        { input: "My Awesome Project", expected: "my-awesome-project" },
        {
          input: "Getting Started with TypeScript!",
          expected: "getting-started-with-typescript",
        },
        {
          input: "React vs Vue: Which is Better?",
          expected: "react-vs-vue-which-is-better",
        },
        { input: "Building a REST API", expected: "building-a-rest-api" },
        { input: "  Multiple   Spaces  ", expected: "multiple-spaces" },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(generateSlug(input)).toBe(expected);
      });
    });

    it("should handle edge cases in slug generation", () => {
      const generateSlug = (title: string): string => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^(-|)$/g, "");
      };

      const edgeCases = [
        { input: "", expected: "" },
        { input: "   ", expected: "" },
        { input: "123", expected: "123" },
        { input: "!@#$%^&*()", expected: "" },
        { input: "Title-with-dashes", expected: "titlewithdashes" },
      ];

      edgeCases.forEach(({ input, expected }) => {
        expect(generateSlug(input)).toBe(expected);
      });
    });
  });

  describe("URL Validation", () => {
    it("should validate external URLs", () => {
      const isValidUrl = (url: string): boolean => {
        try {
          new URL(url);
          return url.startsWith("http://") || url.startsWith("https://");
        } catch {
          return false;
        }
      };

      const validUrls = [
        "https://example.com",
        "http://localhost:3000",
        "https://github.com/user/repo",
        "https://subdomain.example.com/path?query=value",
      ];

      const invalidUrls = [
        "not-a-url",
        "ftp://example.com",
        "mailto:test@example.com",
        "javascript:alert('xss')",
        "",
      ];

      validUrls.forEach((url) => {
        expect(isValidUrl(url)).toBe(true);
      });

      invalidUrls.forEach((url) => {
        expect(isValidUrl(url)).toBe(false);
      });
    });

    it("should validate internal routes", () => {
      const isValidInternalRoute = (route: string): boolean => {
        return (
          route.startsWith("/") &&
          !route.includes("..") &&
          !route.includes("//")
        );
      };

      const validRoutes = [
        "/",
        "/about",
        "/projects",
        "/projects/my-project",
        "/blog/my-post",
        "/contact",
      ];

      const invalidRoutes = [
        "about", // missing leading slash
        "//../", // path traversal
        "//example.com", // protocol-relative URL
        "/projects/../admin", // path traversal
      ];

      validRoutes.forEach((route) => {
        expect(isValidInternalRoute(route)).toBe(true);
      });

      invalidRoutes.forEach((route) => {
        expect(isValidInternalRoute(route)).toBe(false);
      });
    });
  });
});

describe("Date and Time Utilities", () => {
  describe("Date Formatting", () => {
    it("should format dates for blog posts", () => {
      const formatBlogDate = (date: Date): string => {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date);
      };

      const testDate = new Date("2024-01-15T10:30:00Z");
      expect(formatBlogDate(testDate)).toBe("January 15, 2024");

      const anotherDate = new Date("2023-12-31T23:59:59Z");
      expect(formatBlogDate(anotherDate)).toBe("December 31, 2023");
    });

    it("should format dates for projects", () => {
      const formatProjectDate = (date: Date): string => {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
        }).format(date);
      };

      const testDate = new Date("2024-01-15");
      expect(formatProjectDate(testDate)).toBe("Jan 2024");

      const anotherDate = new Date("2023-12-31");
      expect(formatProjectDate(anotherDate)).toBe("Dec 2023");
    });

    it("should calculate reading time", () => {
      const calculateReadingTime = (content: string): string => {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min`;
      };

      const shortContent = "This is a short blog post with just a few words.";
      expect(calculateReadingTime(shortContent)).toBe("1 min");

      // Simulate longer content (400 words ≈ 2 minutes)
      const longContent = Array(400).fill("word").join(" ");
      expect(calculateReadingTime(longContent)).toBe("2 min");
    });
  });

  describe("Date Validation", () => {
    it("should validate date objects", () => {
      const isValidDate = (date: unknown): date is Date => {
        return date instanceof Date && !isNaN(date.getTime());
      };

      const validDates = [
        new Date(),
        new Date("2024-01-01"),
        new Date(2024, 0, 1), // January 1, 2024
      ];

      const invalidDates = [
        "2024-01-01", // string, not Date
        new Date("invalid"),
        null,
        undefined,
        {},
      ];

      validDates.forEach((date) => {
        expect(isValidDate(date)).toBe(true);
      });

      invalidDates.forEach((date) => {
        expect(isValidDate(date)).toBe(false);
      });
    });
  });
});

describe("Content Validation Utilities", () => {
  describe("Text Sanitization", () => {
    it("should sanitize user input", () => {
      const sanitizeText = (text: string): string => {
        return text
          .trim()
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;")
          .replace(/\//g, "&#x2F;");
      };

      const testCases = [
        { input: "Hello World", expected: "Hello World" },
        {
          input: "<script>alert('xss')</script>",
          expected: "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;&#x2F;script&gt;",
        },
        {
          input: 'Title with "quotes"',
          expected: "Title with &quot;quotes&quot;",
        },
        { input: "  Trimmed text  ", expected: "Trimmed text" },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(sanitizeText(input)).toBe(expected);
      });
    });

    it("should validate content length", () => {
      const validateLength = (
        text: string,
        min: number,
        max: number,
      ): boolean => {
        const length = text.trim().length;
        return length >= min && length <= max;
      };

      expect(validateLength("Valid title", 5, 100)).toBe(true);
      expect(validateLength("Hi", 5, 100)).toBe(false); // too short
      expect(validateLength("A".repeat(101), 5, 100)).toBe(false); // too long
      expect(validateLength("", 0, 100)).toBe(true); // empty allowed
    });
  });

  describe("Tag Validation", () => {
    it("should validate blog tags", () => {
      const isValidTag = (tag: string): boolean => {
        return /^[a-z0-9-]+$/.test(tag) && tag.length >= 2 && tag.length <= 20;
      };

      const validTags = [
        "javascript",
        "react",
        "web-dev",
        "typescript",
        "css3",
      ];
      const invalidTags = [
        "",
        "a",
        "A",
        "tag with spaces",
        "verylongtagnamethatisinvalid",
        "tag!",
        "tag@",
      ];

      validTags.forEach((tag) => {
        expect(isValidTag(tag)).toBe(true);
      });

      invalidTags.forEach((tag) => {
        expect(isValidTag(tag)).toBe(false);
      });
    });

    it("should normalize tags", () => {
      const normalizeTag = (tag: string): string => {
        return tag
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^(-|-$)/g, "");
      };

      const testCases = [
        { input: "JavaScript", expected: "javascript" },
        { input: "React.js", expected: "reactjs" },
        { input: "Web Development", expected: "webdevelopment" },
        { input: "  TypeScript!  ", expected: "typescript" },
      ];

      testCases.forEach(({ input, expected }) => {
        expect(normalizeTag(input)).toBe(expected);
      });
    });
  });
});

describe("Search and Filter Utilities", () => {
  describe("Search Functions", () => {
    it("should perform case-insensitive search", () => {
      const searchContent = (content: string, query: string): boolean => {
        return content.toLowerCase().includes(query.toLowerCase());
      };

      expect(searchContent("JavaScript Tutorial", "script")).toBe(true);
      expect(searchContent("React Hooks Guide", "HOOKS")).toBe(true);
      expect(searchContent("TypeScript Basics", "python")).toBe(false);
      expect(searchContent("", "query")).toBe(false);
    });

    it("should handle search with multiple terms", () => {
      const includesQuery = (contentLower: string, query: string): boolean => {
        return contentLower.includes(query.toLowerCase());
      };

      const searchMultiple = (content: string, queries: string[]): boolean => {
        const contentLower = content.toLowerCase();
        return queries.some((query) => includesQuery(contentLower, query));
      };

      const content = "Advanced React Patterns and Best Practices";

      expect(searchMultiple(content, ["react", "patterns"])).toBe(true);
      expect(searchMultiple(content, ["vue", "angular"])).toBe(false);
      expect(searchMultiple(content, ["ADVANCED", "practices"])).toBe(true);
    });
  });

  describe("Filter Functions", () => {
    it("should filter by tags", () => {
      const mockPosts = [
        { title: "Post 1", tags: ["javascript", "react"] },
        { title: "Post 2", tags: ["typescript", "node"] },
        { title: "Post 3", tags: ["react", "hooks"] },
      ];

      const filterByTag = (posts: typeof mockPosts, tag: string) => {
        return posts.filter((post) => post.tags.includes(tag));
      };

      const reactPosts = filterByTag(mockPosts, "react");
      expect(reactPosts).toHaveLength(2);
      expect(reactPosts[0].title).toBe("Post 1");
      expect(reactPosts[1].title).toBe("Post 3");

      const typescriptPosts = filterByTag(mockPosts, "typescript");
      expect(typescriptPosts).toHaveLength(1);
      expect(typescriptPosts[0].title).toBe("Post 2");
    });

    it("should sort content by date", () => {
      const mockContent = [
        { title: "Post 1", date: new Date("2024-01-01") },
        { title: "Post 2", date: new Date("2024-01-15") },
        { title: "Post 3", date: new Date("2024-01-10") },
      ];

      const sortByDate = (content: typeof mockContent, ascending = false) => {
        return [...content].sort((a, b) => {
          return ascending
            ? a.date.getTime() - b.date.getTime()
            : b.date.getTime() - a.date.getTime();
        });
      };

      const newestFirst = sortByDate(mockContent);
      expect(newestFirst[0].title).toBe("Post 2"); // Jan 15
      expect(newestFirst[2].title).toBe("Post 1"); // Jan 1

      const oldestFirst = sortByDate(mockContent, true);
      expect(oldestFirst[0].title).toBe("Post 1"); // Jan 1
      expect(oldestFirst[2].title).toBe("Post 2"); // Jan 15
    });
  });
});
