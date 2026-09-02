import { describe, expect, it } from "vitest";
import { AVAILABLE_TAGS, PHOTO_TAGS } from "@/lib/mock-tag-data";

describe("gallery tag data", () => {
  it("provides a sorted, duplicate-free tag list", () => {
    expect(AVAILABLE_TAGS).toEqual([...new Set(AVAILABLE_TAGS)].sort());
  });

  it("contains the comparison examples used by the workshop", () => {
    expect(PHOTO_TAGS.EVENT).toContain("wedding");
    expect(PHOTO_TAGS.SUBJECT).toContain("wildlife");
  });
});