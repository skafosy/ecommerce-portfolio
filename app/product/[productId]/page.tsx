import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatMoney, getProduct, products } from "@/lib/catalog";
import ProductArt from "@/components/product-art";
import ProductCard from "@/components/product-card";
import AddToCart from "@/components/add-to-cart";

type Props = { params: Promise<{ productId: string }> };
export function generateStaticParams() {
  return products.map((product) => ({ productId: product.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).productId);
  return {
    title: product
      ? `${product.name} · ${product.colorName}`
      : "Product not found",
  };
}
export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).productId);
  if (!product) notFound();
  const related = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  return (
    <div className="page-shell">
      <Link href="/#catalog" className="text-button">
        ← Back to the collection
      </Link>
      <div className="product-detail">
        <div
          className="detail-art"
          style={{ backgroundColor: `${product.color}20` }}
        >
          <span className="product-tag">{product.tag}</span>
          <ProductArt product={product} className="w-full" />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">
            {product.category} / {product.colorName}
          </p>
          <h1>{product.name}</h1>
          <p className="mt-5 text-3xl font-semibold">
            {formatMoney(product.priceMinor)}
          </p>
          <p className="my-7 max-w-lg leading-7 text-slate-600">
            {product.description}
          </p>
          <div className="mb-7 flex items-center gap-3 border-y border-slate-200 py-5">
            <span
              className="h-5 w-5 rounded-full border border-black/10"
              style={{ background: product.color }}
            />
            <span>{product.colorName}</span>
            <span className="ml-auto text-sm text-slate-500">
              {product.stock
                ? `${product.stock} available in demo`
                : "Currently unavailable"}
            </span>
          </div>
          <AddToCart product={product} />
          <p className="text-xs leading-5 text-slate-500">
            This is a fictional product. Adding it to your bag does not place an
            order. No login, payment, or personal information is needed.
          </p>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <p className="eyebrow">KEEP EXPLORING</p>
          <h2 className="mb-7 mt-2 text-3xl font-semibold">
            Another shade of play.
          </h2>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
