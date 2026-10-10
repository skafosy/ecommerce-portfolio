export const categories = ["controllers", "audio", "accessories"] as const;
export type Category = (typeof categories)[number];
export type SortOrder = "featured" | "price-asc" | "price-desc";
export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  priceMinor: number;
  stock: number;
  color: string;
  colorName: string;
  tag: string;
};

// Fictional products, prices and availability. No production database is used.
export const products: readonly Product[] = [
  {
    id: "orbit-coral",
    name: "Orbit Controller",
    category: "controllers",
    description:
      "A little color for your next adventure. A fictional wireless controller with a comfortable grip and a clean, playful shape.",
    priceMinor: 189000,
    stock: 8,
    color: "#ed765c",
    colorName: "Coral",
    tag: "Staff pick",
  },
  {
    id: "cloud-headset",
    name: "Cloud Headset",
    category: "audio",
    description:
      "Settle into your favorite world. A fictional over-ear headset designed for long evenings and clear conversations.",
    priceMinor: 249000,
    stock: 5,
    color: "#98b6ac",
    colorName: "Sage",
    tag: "New arrival",
  },
  {
    id: "pocket-case",
    name: "Pocket Travel Case",
    category: "accessories",
    description:
      "A home for your handheld when you are on the move. A fictional protective case with room for the small essentials.",
    priceMinor: 69000,
    stock: 12,
    color: "#e9be61",
    colorName: "Honey",
    tag: "Everyday essential",
  },
  {
    id: "orbit-midnight",
    name: "Orbit Controller",
    category: "controllers",
    description:
      "Your familiar controls in a quieter shade. A fictional wireless controller for your next co-op session.",
    priceMinor: 189000,
    stock: 6,
    color: "#59667f",
    colorName: "Midnight",
    tag: "Classic",
  },
  {
    id: "desk-dock",
    name: "Little Desk Dock",
    category: "accessories",
    description:
      "Keep your setup simple. A fictional desktop stand that gives your handheld a place of its own.",
    priceMinor: 99000,
    stock: 4,
    color: "#a9a2ce",
    colorName: "Lilac",
    tag: "Small upgrade",
  },
  {
    id: "cloud-sand",
    name: "Cloud Headset",
    category: "audio",
    description:
      "A soft neutral for your desk. This fictional headset is currently unavailable, so the demo prevents adding it to your bag.",
    priceMinor: 249000,
    stock: 0,
    color: "#d6c8b4",
    colorName: "Sand",
    tag: "Sold out",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function filterProducts(
  items: readonly Product[],
  query: string,
  category: string,
  sort: string,
): Product[] {
  const search = query.trim().toLocaleLowerCase();
  const selected = items.filter(
    (product) =>
      (category === "all" || product.category === category) &&
      `${product.name} ${product.colorName} ${product.category}`
        .toLocaleLowerCase()
        .includes(search),
  );
  if (sort === "price-asc")
    selected.sort((a, b) => a.priceMinor - b.priceMinor);
  if (sort === "price-desc")
    selected.sort((a, b) => b.priceMinor - a.priceMinor);
  return selected;
}

export function formatMoney(minor: number): string {
  if (!Number.isSafeInteger(minor) || minor < 0)
    throw new Error("Price must be a non-negative integer in satang");
  return new Intl.NumberFormat("en-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(minor / 100);
}
