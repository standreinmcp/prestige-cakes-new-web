import { describe, expect, it } from "vitest";
import { galleryImages } from "./gallery-data";

describe("galleryImages", () => {
  it("has at least one image", () => {
    expect(galleryImages.length).toBeGreaterThan(0);
  });

  it("each image has required fields", () => {
    for (const image of galleryImages) {
      expect(image.id).toBeTruthy();
      expect(image.src).toMatch(/^\//);
      expect(image.alt).toBeTruthy();
    }
  });
});
