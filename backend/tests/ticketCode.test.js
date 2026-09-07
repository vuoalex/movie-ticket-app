import { describe, test, expect } from "vitest";
import { generateCode } from "../src/utils/ticketCode.js";

describe("generateCode", () => {
  test("returns a code in XXXX-XXXX-XXXX format", () => {
    const code = generateCode();
    expect(code).toMatch(/^[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/);
  });
});
