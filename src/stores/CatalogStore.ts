import { GetProductsQuery } from "@/lib/graphql/generated";
import { PriceSort, StoreError, StoreStatus } from "./store.types";
import { makeAutoObservable, runInAction } from "mobx";
import { fetchProducts } from "@/lib/graphql/products";
import { getMinPrice } from "@/lib/helpers/catalog-helper";

export class CatalogStore {
  products: GetProductsQuery["products"] = [];
  search: string = "";
  status: StoreStatus = "idle";
  error: StoreError = null;
  inStockOnly = false;
  sort: PriceSort = "default";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get visibleProducts() {
    const query = this.search.trim().toLowerCase();
    const sort = this.sort;
    const products = this.products.filter((product) => {
      const mathesQuery = product.name.toLowerCase().includes(query);
      const inStock = product.colors.some((color) => color.sizes.length > 0);
      return mathesQuery && (!this.inStockOnly || inStock);
    });
    if (sort === "default") return products;
    return products.sort((left, right) => {
      const leftPrice = getMinPrice(left);
      const rightrice = getMinPrice(right);
      if (leftPrice === null) return rightrice === null ? 0 : 1;
      if (rightrice === null) return -1;
      return sort === "asc" ? leftPrice - rightrice : rightrice - leftPrice;
    });
  }

  async loadProducts() {
    if (this.status === "loading" || this.status === "success") return;
    this.status = "loading";
    this.error = null;
    try {
      const products = await fetchProducts();
      runInAction(() => {
        this.products = products;
        this.status = "success";
      });
    } catch (err) {
      runInAction(() => {
        this.error = "Данные не загружены";
        this.status = "error";
      });
    }
  }
  setSearch(query: string) {
    this.search = query;
  }
  setInStockOnly(enabled: boolean) {
    this.inStockOnly = enabled;
  }
  setSort(sort: PriceSort) {
    this.sort = sort;
  }
}
