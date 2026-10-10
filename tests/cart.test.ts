import { describe, expect, it } from "vitest";
import { cartReducer, cartTotal, restoreCart } from "@/lib/cart";

describe("demo cart", () => {
  it("merges repeated additions, caps stock, and refuses unknown or sold-out products", () => {
    let state = cartReducer([], { type: "add", productId: "orbit-coral" });
    state = cartReducer(state, { type: "add", productId: "orbit-coral" });
    expect(state).toEqual([{ productId: "orbit-coral", quantity: 2 }]);
    state = cartReducer(state, {
      type: "quantity",
      productId: "orbit-coral",
      quantity: 100,
    });
    expect(state[0].quantity).toBe(8);
    expect(
      cartReducer(state, { type: "add", productId: "cloud-sand" }),
    ).toEqual(state);
    expect(cartReducer(state, { type: "add", productId: "missing" })).toEqual(
      state,
    );
  });
  it("rejects fractional or negative quantities and computes totals from trusted prices", () => {
    const state = [
      { productId: "orbit-coral", quantity: 2 },
      { productId: "pocket-case", quantity: 1 },
    ];
    expect(cartTotal(state)).toBe(447000);
    for (const quantity of [-2, 0, 1.5, NaN])
      expect(
        cartReducer(state, {
          type: "quantity",
          productId: "orbit-coral",
          quantity,
        }),
      ).toEqual(state);
    expect(
      cartReducer(state, { type: "remove", productId: "orbit-coral" }),
    ).toEqual([{ productId: "pocket-case", quantity: 1 }]);
    expect(cartReducer(state, { type: "clear" })).toEqual([]);
  });
  it("recovers safely from corrupt storage and ignores forged prices, duplicates and invalid products", () => {
    expect(restoreCart("broken JSON")).toEqual([]);
    expect(restoreCart('{"quantity":3}')).toEqual([]);
    expect(
      restoreCart(
        JSON.stringify([
          { productId: "orbit-coral", quantity: 99, priceMinor: 1 },
          { productId: "orbit-coral", quantity: 1 },
          { productId: "missing", quantity: 1 },
          { productId: "cloud-sand", quantity: 1 },
          { productId: "cloud-headset", quantity: "2" },
          { productId: "pocket-case", quantity: -1 },
          null,
        ]),
      ),
    ).toEqual([{ productId: "orbit-coral", quantity: 8 }]);
  });
});
