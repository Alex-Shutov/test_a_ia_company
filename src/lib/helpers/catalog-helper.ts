import type { GetProductsQuery } from "@/lib/graphql/generated";

type CatalogProduct = GetProductsQuery["products"][number];

export function getMinPrice(product: CatalogProduct): number | null {
  if (product.colors.length === 0) return null;

  return Math.min(...product.colors.map((color) => Number(color.price)));
}