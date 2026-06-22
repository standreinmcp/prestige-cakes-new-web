import { describe, expect, it } from "vitest";
import { toSlug } from "./slug";

describe("toSlug", () => {
  it("lowercases and hyphenates", () => {
    expect(toSlug("Tort Aniversare")).toBe("tort-aniversare");
  });

  it("strips diacritics", () => {
    expect(toSlug("Cozonac tradițional")).toBe("cozonac-traditional");
  });
});
