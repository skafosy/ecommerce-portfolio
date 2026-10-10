import { filterProducts, products, categories } from "@/lib/catalog";

// Read-only synthetic data. There are intentionally no write or payment endpoints.
export function GET(request: Request) {
  const query = new URL(request.url).searchParams;
  const category = query.get("category") ?? "all";
  const sort = query.get("sort") ?? "featured";
  const search = query.get("q") ?? "";
  if (
    (category !== "all" && !categories.some((value) => value === category)) ||
    !["featured", "price-asc", "price-desc"].includes(sort) ||
    search.length > 100
  ) {
    return Response.json(
      { error: "Invalid category, sort, or search length" },
      { status: 400 },
    );
  }
  return Response.json({
    data: filterProducts(products, search, category, sort),
    demo: true,
  });
}
