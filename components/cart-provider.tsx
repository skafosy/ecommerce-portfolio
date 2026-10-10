"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  cartReducer,
  restoreCart,
  type CartAction,
  type CartLine,
} from "@/lib/cart";

const storageKey = "big-b-demo-cart-v1";
const CartContext = createContext<{
  lines: CartLine[];
  dispatch: Dispatch<CartAction>;
  ready: boolean;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, []);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Browser storage is untrusted; validate it and never persist customer data.
    try {
      dispatch({
        type: "restore",
        lines: restoreCart(localStorage.getItem(storageKey)),
      });
    } catch {
      /* Storage may be disabled. The bag still works in memory. */
    }
    // This effect synchronizes an external browser store after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(lines));
    } catch {
      /* No persistence when storage is unavailable. */
    }
  }, [lines, ready]);
  return (
    <CartContext.Provider value={{ lines, dispatch, ready }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart must be used inside CartProvider");
  return context;
}
