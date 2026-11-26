import { makeAutoObservable } from "mobx";

export type CartItem = {
  productId: number;
  colorId: number;
  sizeId: number;
  productName: string;
  colorName: string;
  sizeName: string;
  image: string | null;
  unitPrice: number;
  quantity: number;
};

type CartItemKey = `${number}_${number}_${number}`;

export class CartSotre {
  cart = new Map<CartItemKey, CartItem>();
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get totalQuantity() {
    return Array.from(this.cart.values()).reduce(
      (prev, curr, _) => prev + curr.quantity,
      0,
    );
  }

  get totalPrice() {
    return Array.from(this.cart.values()).reduce(
      (prev, curr, _) => prev + curr.unitPrice * curr.quantity,
      0,
    );
  }

  addItem(item: Omit<CartItem, "quantity">) {
    const key = this.generateKeyByParams(item);
    const value = this.cart.get(key);
    if (value) {
      value.quantity += 1;
    } else this.cart.set(key, { ...item, quantity: 1 });
  }

  setQuantity(
    item: Pick<CartItem, "productId" | "colorId" | "sizeId">,
    quantity: number,
  ) {
    if (quantity < 1 || !Number.isInteger(quantity)) return;
    const key = this.generateKeyByParams(item);
    const value = this.cart.get(key);
    if (value) {
      value.quantity = quantity;
    }
  }

  removeItem(item: Pick<CartItem, "productId" | "colorId" | "sizeId">) {
    const key = this.generateKeyByParams(item);
    return this.cart.delete(key);
  }

  private generateKeyByParams({
    productId,
    colorId,
    sizeId,
  }: Pick<CartItem, "colorId" | "productId" | "sizeId">): CartItemKey {
    return `${productId}_${colorId}_${sizeId}`;
  }
}
