import { describe, it, expect } from "vitest";

describe("Example Test Suite", () => {
  it("should perform basic arithmetic", () => {
    expect(2 + 2).toBe(4);
  });

  it("should work with strings", () => {
    expect("hello world").toContain("world");
  });

  it("should work with arrays", () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });
});

describe("DOM Testing Example", () => {
  it("should create and manipulate DOM elements", () => {
    const div = document.createElement("div");
    div.innerHTML = "<p>Hello, Vitest!</p>";

    expect(div.querySelector("p")).toBeTruthy();
    expect(div.querySelector("p")?.textContent).toBe("Hello, Vitest!");
  });
});
