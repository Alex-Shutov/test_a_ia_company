"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { RootStore } from "./RootStore";
import { CartItem } from "./CartSotre";
import { reaction } from "mobx";

const StoreContext = createContext<RootStore | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [rootStore] = useState(() => new RootStore());
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
}

export function useStores() {
  const rootStore = useContext(StoreContext);
  if (rootStore === null) {
    throw new Error();
  }

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    const saved = JSON.parse(raw ?? "[]");
    if (Array.isArray(saved)) {
      rootStore.cart.restoreItems(saved.filter(isCartItem));
    }

    return reaction(
      () => JSON.stringify(Array.from(rootStore.cart.cart.values())),
      (snapshot) => {
        localStorage.setItem("cart", snapshot);
      },
    );
  }, [rootStore]);

  return rootStore;
}

function isCartItem(value: unknown): value is CartItem {
  if (value === null || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === "number" &&
    Number.isSafeInteger(item.productId) &&
    item.productId > 0 &&
    typeof item.colorId === "number" &&
    Number.isSafeInteger(item.colorId) &&
    item.colorId > 0 &&
    typeof item.sizeId === "number" &&
    Number.isSafeInteger(item.sizeId) &&
    item.sizeId > 0 &&
    typeof item.quantity === "number" &&
    Number.isSafeInteger(item.quantity) &&
    item.quantity > 0 &&
    typeof item.productName === "string" &&
    typeof item.colorName === "string" &&
    typeof item.sizeName === "string" &&
    typeof item.image === "string" &&
    typeof item.unitPrice === "number" &&
    Number.isFinite(item.unitPrice) &&
    item.unitPrice >= 0
  );
}
