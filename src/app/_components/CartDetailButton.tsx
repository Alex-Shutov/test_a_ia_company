"use client";
import { useStores } from "@/stores/StoreProvider";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useMemo } from "react";
import QuantityStepper from "./QuantityStepper";
type Props = {
  productId: number | null;
  colorId: number | null;
  sizeId: number | null;
  onAdd: () => void;
};
export default observer(function CartDetailButton({
  productId,
  colorId,
  sizeId,
  onAdd,
}: Props) {
  const { cart } = useStores();

  if (!productId || !colorId || !sizeId) {
    return (
      <button
        disabled={true}
        className="w-full rounded-2xl h-8 py-8 flex flex-col justify-center items-center bg-zinc-300 text-zinc-500 disabled:cursor-not-allowed"
      >
        <p className="text-lg font-semibold">Товар в корзину не добавить</p>
        <p className="text-md">Проверьте выбор цвета и размера</p>
      </button>
    );
  }

  if (!cart.getQuantity({ productId, colorId, sizeId })) {
    return (
      <button
        onClick={onAdd}
        className="w-full rounded-2xl h-8 py-6 flex flex-col justify-center items-center bg-black text-white hover:bg-zinc-800 duration-300 transition-colors"
      >
        <p className="text-lg font-semibold">Добавить в корзину</p>
      </button>
    );
  }

  const variant = { productId, colorId, sizeId };
  const quantity = cart.getQuantity(variant);
  return (
    <div className="flex flex-row flex-wrap gap-8">
      <QuantityStepper
        quantity={quantity}
        onDecrease={() => {
          if (quantity === 1) cart.removeItem(variant);
          else cart.setQuantity(variant, quantity - 1);
        }}
        onIncrease={() => cart.setQuantity(variant, quantity + 1)}
      />
      <Link
        href={"/cart"}
        className="bg-black rounded-2xl px-12 text-center flex flex-col justify-center text-white hover:bg-zinc-800 duration-300 transition-colors ease-in-out"
      >
        <p className="text-lg font-semibold ">К корзине</p>
      </Link>
    </div>
  );
});
