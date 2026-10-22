import { describe, expect, it } from "vitest";
import * as format from "./format";

describe("formatCents", () => {
  it("formats cents as rupees with two decimals", () => {
    expect(format.formatCents(123456)).toBe("₹1,234.56");
    expect(format.formatCents(5)).toBe("₹0.05");
  });
});

describe("toBars", () => {
  it("sorts categories from largest to smallest with their share", () => {
    const bars = format.toBars({ food: 1500, rent: 3000, travel: 500 });
    expect(bars.map((bar) => bar.category)).toEqual(["rent", "food", "travel"]);
    expect(bars.map((bar) => bar.percent)).toEqual([60, 30, 10]);
  });

  it("handles an empty month", () => {
    expect(format.toBars({})).toEqual([]);
  });
});

describe("shiftMonth", () => {
  it("wraps across year boundaries", () => {
    expect(format.shiftMonth(2026, 12, 1)).toEqual({ year: 2027, month: 1 });
    expect(format.shiftMonth(2026, 1, -1)).toEqual({ year: 2025, month: 12 });
  });
});
