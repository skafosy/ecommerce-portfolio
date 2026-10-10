import type { Metadata } from "next";
import CartView from "@/components/cart-view";
export const metadata: Metadata = { title: "Your demo bag" };
export default function CartPage() {
  return (
    <div className="page-shell">
      <p className="eyebrow">A FEW GOOD FINDS</p>
      <h1 className="page-title">Your bag.</h1>
      <CartView />
    </div>
  );
}
