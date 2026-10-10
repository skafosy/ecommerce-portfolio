import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { formatMoney } from "@/lib/catalog";
import ProductArt from "@/components/product-art";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link
        href={`/product/${product.id}`}
        className="product-link"
        aria-label={`View ${product.name}, ${product.colorName}`}
      >
        <div
          className="product-image"
          style={{ backgroundColor: `${product.color}18` }}
        >
          <span className="product-tag">{product.tag}</span>
          <ProductArt
            product={product}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="product-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="flex items-start justify-between gap-3 pt-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {product.colorName} / {product.category}
            </p>
          </div>
          <span className="pt-1 text-sm font-semibold">
            {formatMoney(product.priceMinor)}
          </span>
        </div>
      </Link>
    </article>
  );
}
