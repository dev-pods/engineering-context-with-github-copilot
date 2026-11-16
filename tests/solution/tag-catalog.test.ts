import { describe, expect, it } from "vitest";
import { AVAILABLE_TAGS, PHOTO_TAGS } from "@/lib/mock-tag-data";

describe("expanded tag catalog", () => {
  it("preserves the original tags and adds the requested terms", () => {
    expect(AVAILABLE_TAGS).toEqual(expect.arrayContaining([
      "landscape", "portrait", "architecture", "nature", "wildlife", "street",
      "wedding", "professional", "studio", "macro", "city", "building",
      "travel", "outdoor", "editorial",
    ]));
  });
  it("derives sorted unique lowercase tags from the categories", () => {
    const categories = Object.values(PHOTO_TAGS).flat();
    expect(AVAILABLE_TAGS).toEqual([...categories].sort());
    expect(categories.length).toBe(new Set(categories).size);
    expect(categories.every((tag) => tag === tag.toLowerCase() && tag === tag.trim())).toBe(true);
  });
});