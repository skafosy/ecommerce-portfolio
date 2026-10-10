import { describe, expect, it } from "vitest";
import { filterProducts, formatMoney, products } from "@/lib/catalog";
import { GET } from "@/app/api/products/route";

describe("synthetic catalog", () => {
  it("combines trimmed case-insensitive search with category without changing the source order", () => {
    const ids = products.map((item) => item.id);
    expect(
      filterProducts(products, "  CORAL  ", "controllers", "featured").map(
        (item) => item.id,
      ),
    ).toEqual(["orbit-coral"]);
    expect(filterProducts(products, "coral", "audio", "featured")).toEqual([]);
    const sorted = filterProducts(products, "", "all", "price-asc");
    expect(sorted[0].id).toBe("pocket-case");
    expect(sorted.at(-1)?.priceMinor).toBe(249000);
    expect(products.map((item) => item.id)).toEqual(ids);
  });
  it("formats satang without losing cents and rejects invalid prices", () => {
    expect(formatMoney(123456)).toContain("1,234.56");
    expect(formatMoney(0)).toContain("0");
    for (const invalid of [NaN, Infinity, -1, 1.5])
      expect(() => formatMoney(invalid)).toThrow();
  });
  it("returns filtered read-only demo data and rejects invalid API filters", async () => {
    const response = GET(
      new Request("http://localhost/api/products?category=audio"),
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.demo).toBe(true);
    expect(body.data).toHaveLength(2);
    expect(
      GET(new Request("http://localhost/api/products?category=unknown")).status,
    ).toBe(400);
    expect(
      GET(new Request("http://localhost/api/products?sort=unknown")).status,
    ).toBe(400);
    expect(
      GET(new Request(`http://localhost/api/products?q=${"x".repeat(101)}`))
        .status,
    ).toBe(400);
  });
});
