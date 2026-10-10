import { test, expect } from "@playwright/test";

test("browse, filter, persist the bag and complete the demo", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Good gear. Great times." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Controllers", exact: true }).click();
  await expect(page.getByRole("article")).toHaveCount(2);
  await page
    .getByRole("link", { name: "View Orbit Controller, Coral" })
    .click();
  await page.getByRole("button", { name: "Add to demo bag" }).click();
  await page.getByRole("link", { name: "Bag, 1 items" }).click();
  await page
    .getByRole("combobox", { name: "Quantity for Orbit Controller Coral" })
    .selectOption("2");
  await expect(page.getByTestId("cart-total")).toContainText("3,780");
  await page.reload();
  await expect(
    page.getByRole("combobox", { name: "Quantity for Orbit Controller Coral" }),
  ).toHaveValue("2");
  await page.getByRole("button", { name: "Complete demo" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "No order was created and no payment was taken.",
  );
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("handles empty search, unavailable stock, missing products and API validation", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await page
    .getByRole("searchbox", { name: "Search products" })
    .fill("nothing-matches");
  await expect(
    page.getByRole("heading", { name: "No matching products" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByRole("link", { name: "View Cloud Headset, Sand" }).click();
  await expect(
    page.getByRole("button", { name: "Out of stock" }),
  ).toBeDisabled();
  const missing = await page.goto("/product/not-a-product");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "We could not find that page." }),
  ).toBeVisible();
  expect((await request.get("/api/products?sort=invalid")).status()).toBe(400);
  expect((await request.post("/api/products", { data: {} })).status()).toBe(
    405,
  );
});
