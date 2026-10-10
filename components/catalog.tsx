"use client";

import { useMemo, useState } from "react";
import { categories, filterProducts, type Product } from "@/lib/catalog";
import ProductCard from "@/components/product-card";

export default function Catalog({
  products,
}: {
  products: readonly Product[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const results = useMemo(
    () => filterProducts(products, query, category, sort),
    [products, query, category, sort],
  );
  function reset() {
    setQuery("");
    setCategory("all");
    setSort("featured");
  }
  return (
    <section id="catalog" className="catalog-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE GOOD STUFF</p>
          <h2>Find your next favorite.</h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-slate-500">
          A small collection for big adventures.
          <br />
          Explore our fictional gaming essentials.
        </p>
      </div>
      <div className="catalog-controls">
        <div
          className="category-tabs"
          role="group"
          aria-label="Product category"
        >
          {["all", ...categories].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={category === value}
              className={category === value ? "active" : ""}
              onClick={() => setCategory(value)}
            >
              {value === "all"
                ? "All products"
                : value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="search-label">
            <span className="sr-only">Search products</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find something good…"
              maxLength={100}
            />
          </label>
          <label>
            <span className="sr-only">Sort products</span>
            <select
              aria-label="Sort products"
              className="sort-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      <p role="status" className="mb-6 text-xs text-slate-500">
        {results.length} {results.length === 1 ? "product" : "products"} to
        explore
      </p>
      {results.length ? (
        <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No matching products</h3>
          <p>Try another name or explore the whole collection.</p>
          <button type="button" className="text-button" onClick={reset}>
            Clear filters <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
