"use client";

import { useStores } from "@/stores/StoreProvider";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import ProductView from "./ProductView";

export default observer(function CatalogView() {
  const { catalog } = useStores();

  useEffect(() => {
    catalog.loadProducts();
  }, [catalog]);

  if (catalog.status === "idle" || catalog.status === "loading") {
    return <p>Загружаем данные...</p>;
  }

  if (catalog.products.length === 0) {
    return <p>Товаров нет</p>;
  }

  const products = catalog.visibleProducts;
  return (
    <section className="space-y-6">
      <div className="flex flex-row items-center">
        <label className="block">
          <span className="mb-1 block text-sm font-sans">
            Поиск по названию
          </span>
          <input
            type="search"
            className=" px-2 rounded-lg border border-zinc-50"
            value={catalog.search}
            placeholder={"Поиск"}
            onChange={(e) => catalog.setSearch(e.target.value)}
          ></input>
        </label>
        <label className="flex flex-col gap-1 px-4">
          <span className="text-sm">Сортировка по цене</span>
          <select
            value={catalog.sort}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (value === "default" || value === "asc" || value === "desc") {
                catalog.setSort(value);
              }
            }}
            className="rounded-lg border border-zinc-400 bg-transparent px-2 py-0.5"
          >
            <option value="default">По умолчанию</option>
            <option value="asc">Сначала дешевле</option>
            <option value="desc">Сначала дороже</option>
          </select>
        </label>
        <label className=" align-center ml-auto inline-flex gap-2 cursor-pointer select-none">
          <span className="mb-1 block text-sm font-sans">В наличии</span>
          <input
            type="checkbox"
            className="w-4 h-4  rounded "
            checked={catalog.inStockOnly}
            onChange={(e) => catalog.setInStockOnly(!catalog.inStockOnly)}
          />
        </label>
      </div>

      {products.length === 0 ? (
        <p className="px-2">Ничего не найдено</p>
      ) : (
        <ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductView key={product.id} product={product} />
          ))}
        </ul>
      )}
    </section>
  );
});
