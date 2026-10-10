"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function Header() {
  const { lines } = useCart();
  const count = lines.reduce((total, line) => total + line.quantity, 0);
  return (
    <>
      <div className="demo-strip">
        Portfolio demo · Fictional products · No real orders or payments
      </div>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Big B Store home">
          <span className="brand-mark">b.</span>
          <span>
            BIG B<span className="brand-small">PLAY A LITTLE.</span>
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-5 sm:gap-9"
        >
          <Link href="/#catalog" className="nav-link">
            Shop
          </Link>
          <Link href="/about" className="nav-link">
            The project
          </Link>
          <Link
            href="/cart"
            className="bag-link"
            aria-label={`Bag, ${count} items`}
          >
            <span className="hidden sm:inline">Your bag</span>
            <span className="sm:hidden">Bag</span>
            <span className="bag-count">{count}</span>
          </Link>
        </nav>
      </header>
    </>
  );
}
