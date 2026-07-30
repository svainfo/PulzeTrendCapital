import { cn, formatNumber, truncate, slugify } from "@/lib/utils";

describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
  it("handles conditional classes", () => {
    expect(cn("base", false && "skip", "keep")).toBe("base keep");
  });
  it("deduplicates Tailwind classes", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
  });
});

describe("formatNumber()", () => {
  it("formats billions", () => expect(formatNumber(1_500_000_000)).toBe("1.5B"));
  it("formats millions", () => expect(formatNumber(2_500_000)).toBe("2.5M"));
  it("formats thousands with commas", () => expect(formatNumber(250_000)).toBe("250,000"));
  it("returns small numbers as-is", () => expect(formatNumber(42)).toBe("42"));
});

describe("truncate()", () => {
  it("does not truncate short strings", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });
  it("truncates long strings with ellipsis", () => {
    expect(truncate("hello world", 5)).toBe("hello…");
  });
});

describe("slugify()", () => {
  it("converts to lowercase kebab-case", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
  it("strips special characters", () => {
    expect(slugify("Forex & CFD Trading!")).toBe("forex-cfd-trading");
  });
});
