"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { cartTotal } from "@/lib/cart";
import { formatMoney, getProduct } from "@/lib/catalog";
import ProductArt from "@/components/product-art";

export default function CartView() {
  const { lines, dispatch, ready } = useCart();
  const [complete, setComplete] = useState(false);
  if (!ready)
    return (
      <p role="status" className="py-16">
        Loading your demo bag…
      </p>
    );
  if (!lines.length)
    return (
      <div className="empty-state">
        {complete ? (
          <>
            <p className="eyebrow">ALL DONE</p>
            <h2>Demo complete. Thanks for exploring!</h2>
            <p role="status">No order was created and no payment was taken.</p>
          </>
        ) : (
          <>
            <h2>Your bag is taking a little break.</h2>
            <p>Find a favorite and bring it back here.</p>
          </>
        )}
        <Link href="/#catalog" className="primary-button mt-6">
          Explore the collection ↗
        </Link>
      </div>
    );
  return (
    <div className="cart-grid">
      <div className="space-y-5">
        {lines.map((line) => {
          const product = getProduct(line.productId);
          if (!product) return null;
          return (
            <article key={product.id} className="cart-line">
              <Link
                href={`/product/${product.id}`}
                className="cart-art"
                aria-label={`View ${product.name}`}
                style={{ backgroundColor: `${product.color}20` }}
              >
                <ProductArt product={product} />
              </Link>
              <div className="flex-1">
                <Link
                  href={`/product/${product.id}`}
                  className="text-lg font-semibold"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-sm text-slate-500">
                  {product.colorName} · {formatMoney(product.priceMinor)} each
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <label className="flex items-center gap-2 text-sm">
                    Quantity
                    <select
                      aria-label={`Quantity for ${product.name} ${product.colorName}`}
                      className="quantity-select"
                      value={line.quantity}
                      onChange={(event) =>
                        dispatch({
                          type: "quantity",
                          productId: product.id,
                          quantity: Number(event.target.value),
                        })
                      }
                    >
                      {Array.from({ length: product.stock }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-slate-500 underline underline-offset-4"
                    aria-label={`Remove ${product.name} ${product.colorName}`}
                    onClick={() =>
                      dispatch({ type: "remove", productId: product.id })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
              <strong className="cart-line-total">
                {formatMoney(product.priceMinor * line.quantity)}
              </strong>
            </article>
          );
        })}
      </div>
      <aside className="cart-summary">
        <p className="eyebrow">YOUR LITTLE COLLECTION</p>
        <h2 className="mt-3 text-2xl font-semibold">Bag summary</h2>
        <div className="my-7 flex justify-between border-y border-slate-300 py-5">
          <span>Demo total</span>
          <strong data-testid="cart-total">
            {formatMoney(cartTotal(lines))}
          </strong>
        </div>
        <p className="mb-5 text-sm leading-6 text-slate-600">
          This is a practice checkout. We do not collect an address, create an
          order, calculate shipping, or charge your card.
        </p>
        <button
          type="button"
          className="primary-button w-full"
          onClick={() => {
            setComplete(true);
            dispatch({ type: "clear" });
          }}
        >
          Complete demo <span aria-hidden="true">↗</span>
        </button>
        <Link
          href="/#catalog"
          className="mt-5 block text-center text-sm underline underline-offset-4"
        >
          Keep exploring
        </Link>
      </aside>
    </div>
  );
}
