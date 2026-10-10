import Link from "next/link";
import Catalog from "@/components/catalog";
import ProductArt from "@/components/product-art";
import { products } from "@/lib/catalog";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-dot" /> A LITTLE MORE PLAY, EVERY DAY
          </p>
          <h1>
            Good gear.
            <br />
            Great <span>times.</span>
          </h1>
          <p className="hero-description">
            For the late-night wins, the couch co-op,
            <br className="hidden sm:block" /> and the one-more-level kind of
            days.
          </p>
          <Link href="#catalog" className="primary-button">
            Explore the collection <span aria-hidden="true">↗</span>
          </Link>
          <div className="hero-footnote">
            <span className="little-stars" aria-hidden="true">
              ✦ ✦ ✦
            </span>
            <span>Made for the joy of playing.</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit" />
          <span className="hero-spark spark-one" aria-hidden="true">
            ✳
          </span>
          <span className="hero-spark spark-two" aria-hidden="true">
            +
          </span>
          <div className="hero-product">
            <ProductArt product={products[0]} />
          </div>
          <div className="hero-sticker">
            <span>LESS SCROLL.</span>
            <strong>MORE PLAY.</strong>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="hero-caption">
            <span className="small-dot" /> ORBIT CONTROLLER{" "}
            <span className="text-slate-500">/ CORAL EDITION</span>
          </div>
        </div>
      </section>
      <div className="values-strip">
        <span>
          <b aria-hidden="true">✦</b> Small collection. Big personality.
        </span>
        <span>
          <b aria-hidden="true">◈</b> Thoughtful details.
        </span>
        <span>
          <b aria-hidden="true">↗</b> Find your kind of fun.
        </span>
      </div>
      <Catalog products={products} />
      <section className="closing-banner">
        <div>
          <p className="eyebrow">LIFE HAS A PAUSE BUTTON.</p>
          <h2>Make time for a little play.</h2>
        </div>
        <Link href="/about" className="light-button">
          Meet the project ↗
        </Link>
      </section>
    </>
  );
}
