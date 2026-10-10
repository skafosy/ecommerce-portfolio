import { expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Catalog from "@/components/catalog";
import AddToCart from "@/components/add-to-cart";
import CartView from "@/components/cart-view";
import { CartProvider } from "@/components/cart-provider";
import { products } from "@/lib/catalog";

it("lets a visitor search, recover from no results, and filter by category", async () => {
  const user = userEvent.setup();
  render(<Catalog products={products} />);
  await user.type(
    screen.getByRole("searchbox", { name: "Search products" }),
    "does-not-exist",
  );
  expect(
    screen.getByRole("heading", { name: "No matching products" }),
  ).toBeVisible();
  await user.click(screen.getByRole("button", { name: "Clear filters" }));
  expect(screen.getAllByRole("article")).toHaveLength(6);
  await user.click(screen.getByRole("button", { name: "Audio" }));
  expect(screen.getAllByRole("article")).toHaveLength(2);
  expect(screen.getByRole("button", { name: "Audio" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

it("sorts the visible cards by price", async () => {
  const user = userEvent.setup();
  render(<Catalog products={products} />);
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Sort products" }),
    "price-asc",
  );
  expect(
    within(screen.getAllByRole("article")[0]).getByRole("heading"),
  ).toHaveTextContent("Pocket Travel Case");
});

it("adds an item, updates quantity and finishes only a demo checkout", async () => {
  const user = userEvent.setup();
  render(
    <CartProvider>
      <AddToCart product={products[0]} />
      <CartView />
    </CartProvider>,
  );
  await user.click(
    await screen.findByRole("button", { name: "Add to demo bag" }),
  );
  expect(
    screen.getByText("Orbit Controller added to your demo bag."),
  ).toBeVisible();
  await user.selectOptions(
    screen.getByRole("combobox", {
      name: "Quantity for Orbit Controller Coral",
    }),
    "2",
  );
  expect(screen.getByTestId("cart-total")).toHaveTextContent("3,780");
  await user.click(screen.getByRole("button", { name: "Complete demo" }));
  expect(
    screen.getByText("No order was created and no payment was taken."),
  ).toBeVisible();
  expect(
    JSON.parse(localStorage.getItem("big-b-demo-cart-v1") ?? "null"),
  ).toEqual([]);
});

it("disables adding a sold-out product", async () => {
  render(
    <CartProvider>
      <AddToCart product={products[5]} />
    </CartProvider>,
  );
  expect(
    await screen.findByRole("button", { name: "Out of stock" }),
  ).toBeDisabled();
});
