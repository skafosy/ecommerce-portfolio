import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "The project" };
export default function AboutPage() {
  return (
    <article className="page-shell about-copy">
      <p className="eyebrow">BEHIND THE LITTLE STORE</p>
      <h1 className="page-title">
        A learning project,
        <br />
        made for real practice.
      </h1>
      <p className="text-xl leading-8">
        Big B began as a proposed Nintendo shop. The potential client changed
        business direction before launch. This edition turns that learning
        experience into a small, public-friendly portfolio demo.
      </p>
      <h2>What you can try</h2>
      <p>
        Search and filter fictional products, compare prices, open a product
        page, and manage a demo bag. The bag can stay on this browser between
        visits. There are no real orders, payments, accounts, or customer
        records.
      </p>
      <h2>How it was made</h2>
      <p>
        The original project was developed while learning from YouTube and using
        AI to solve problems and find commands. This portfolio edition was
        prepared with substantial AI assistance, including new demo code, tests,
        illustrations, and documentation. It is not presented as code written
        entirely by the owner.
      </p>
      <p>
        A learning reference supplied by the owner is{" "}
        <a
          href="https://www.youtube.com/watch?v=dTFXufTgfOE"
          target="_blank"
          rel="noreferrer"
        >
          Coding With Dawid’s full-stack e-commerce tutorial ↗
        </a>
        . The tutorial and the original project use different database stacks;
        this demo does not claim to reproduce the tutorial exactly.
      </p>
      <h2>A deliberate, smaller scope</h2>
      <p>
        The original private admin uses Prisma, MySQL, Clerk, and Cloudinary.
        This public frontend edition uses a synthetic catalog so reviewers can
        try it without depending on those old services. All product
        illustrations here were created as SVG code for this demo.
      </p>
      <p className="mt-8">
        <Link href="/#catalog" className="primary-button">
          Try the demo ↗
        </Link>
      </p>
    </article>
  );
}
