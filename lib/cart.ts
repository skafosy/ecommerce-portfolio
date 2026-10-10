import { getProduct } from "@/lib/catalog";

export type CartLine = { productId: string; quantity: number };
export type CartAction =
  | { type: "add"; productId: string }
  | { type: "quantity"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "restore"; lines: CartLine[] }
  | { type: "clear" };

export function restoreCart(raw: string | null): CartLine[] {
  try {
    const data: unknown = JSON.parse(raw ?? "[]");
    if (!Array.isArray(data)) return [];
    const seen = new Set<string>();
    return data.flatMap((line: unknown) => {
      if (
        !line ||
        typeof line !== "object" ||
        !("productId" in line) ||
        !("quantity" in line)
      )
        return [];
      if (
        typeof line.productId !== "string" ||
        typeof line.quantity !== "number" ||
        !Number.isSafeInteger(line.quantity) ||
        line.quantity < 1 ||
        seen.has(line.productId)
      )
        return [];
      const product = getProduct(line.productId);
      if (!product || product.stock === 0) return [];
      seen.add(line.productId);
      return [
        {
          productId: product.id,
          quantity: Math.min(line.quantity, product.stock),
        },
      ];
    });
  } catch {
    return [];
  }
}

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  if (action.type === "clear") return [];
  if (action.type === "restore")
    return restoreCart(JSON.stringify(action.lines));
  if (action.type === "remove")
    return state.filter((line) => line.productId !== action.productId);
  const product = getProduct(action.productId);
  if (!product || product.stock === 0) return state;
  const existing = state.find((line) => line.productId === product.id);
  const quantity =
    action.type === "add" ? (existing?.quantity ?? 0) + 1 : action.quantity;
  if (!Number.isSafeInteger(quantity) || quantity < 1) return state;
  const next = {
    productId: product.id,
    quantity: Math.min(quantity, product.stock),
  };
  return existing
    ? state.map((line) => (line.productId === product.id ? next : line))
    : [...state, next];
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce(
    (total, line) =>
      total + (getProduct(line.productId)?.priceMinor ?? 0) * line.quantity,
    0,
  );
}
