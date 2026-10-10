"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/lib/catalog";

export default function AddToCart({ product }: { product: Product }) {
  const { lines, dispatch, ready } = useCart();
  const [message, setMessage] = useState("");
  const quantity =
    lines.find((line) => line.productId === product.id)?.quantity ?? 0;
  const unavailable = product.stock === 0;
  const limit = quantity >= product.stock;
  return (
    <div>
      <button
        type="button"
        className="primary-button w-full"
        disabled={!ready || unavailable || limit}
        onClick={() => {
          dispatch({ type: "add", productId: product.id });
          setMessage(`${product.name} added to your demo bag.`);
        }}
      >
        {unavailable
          ? "Out of stock"
          : limit
            ? "Stock limit reached"
            : "Add to demo bag"}
        <span aria-hidden="true">↗</span>
      </button>
      <p role="status" className="mt-3 min-h-6 text-sm text-emerald-800">
        {message}
      </p>
    </div>
  );
}
