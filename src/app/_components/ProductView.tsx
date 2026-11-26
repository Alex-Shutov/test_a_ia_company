"use client";

import { GetProductsQuery } from "@/lib/graphql/generated";
import { Product } from "@/server/graphql/generated";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMinPrice } from "@/lib/helpers/catalog-helper";

type CatalogProduct = GetProductsQuery["products"][number];

export default function ProductView({ product }: { product: CatalogProduct }) {
  const image = product.colors.find((color) => color.images.length > 0)
    ?.images[0];
  const minPrice = getMinPrice(product);

  return (
    <Link
      href={`/products/${product.id}`}
      key={product.id}
      className="overflow-hidden rounded-lg  border border-zinc-200"
    >
      <div className="relative aspect-5/4 md:aspect-4/5 bg-zinc-100">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 400px) 50vw, 100vw"
            className="object-contain"
          />
        ) : (
          <span className="grid h-full place-items-center text-sm text-zinc-500">
            Нет фото
          </span>
        )}
      </div>

      <div className="space-y-1 p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-zinc-600">
          {minPrice === null ? "Цена не указана" : `от ${minPrice} $`}
        </p>
      </div>
    </Link>
  );
}
