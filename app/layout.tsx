import type { Metadata } from "next";
import Link from "next/link";
import { CartProvider } from "@/components/cart-provider";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Big B — Play a little", template: "%s | Big B" },
  description:
    "A playful gaming store portfolio demo by Big B Big saller. Fictional products. No real orders or payments.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main-content">{children}</main>
        </CartProvider>
        <footer className="site-footer">
          <div>
            <Link href="/" className="text-2xl font-extrabold tracking-tight">
              BIG B<span className="text-orange-500">.</span>
            </Link>
            <p className="mt-2 text-sm text-slate-500">
              A little play goes a long way.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            <p>Portfolio by Big B Big saller</p>
            <p className="mt-2">Fictional shop · No real transactions</p>
          </div>
          <Link href="/about" className="text-button">
            About this project ↗
          </Link>
        </footer>
      </body>
    </html>
  );
}
