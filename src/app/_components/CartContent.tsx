"use client";

import { useStores } from "@/stores/StoreProvider";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import QuantityStepper from "./QuantityStepper";
import Link from "next/link";

const formatNumbers = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default observer(function CartContent() {
  const { cart } = useStores();

  if (cart.getCartEntries().length === 0) {
    return (
      <p className="rounded-2xl bg-zinc-100 px-4 py-8 text-center text-zinc-600">
        Корзина пока пуста
      </p>
    );
  }
  return (
    <div className="space-y-5">
      <ul className="divide-y divide-zinc-100">
        {cart.getCartEntries().map(([key, item]) => (
          <li key={key} className="flex gap-4 py-4">
            <div className="relative grid w-20 h-20 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-500">
              {item.image ? (
                <Image src={item.image} fill alt={item.productName} />
              ) : (
                "Нет фото"
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{item.productName}</h3>
              <p className="text-sm text-zinc-500">
                {item.colorName} / {item.sizeName}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {formatNumbers.format(item.unitPrice)}$ за шт.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <QuantityStepper
                  className={"border-0 bg-zinc-200"}
                  quantity={item.quantity}
                  decreaseDisabled={item.quantity === 1}
                  onDecrease={() => cart.setQuantity(item, item.quantity - 1)}
                  onIncrease={() => cart.setQuantity(item, item.quantity + 1)}
                />
                <button
                  type="button"
                  onClick={() => cart.removeItem(item)}
                  className="text-sm text-zinc-600 underline hover:text-black"
                >
                  Удалить
                </button>
                <p className="ml-auto font-semibold tabular-nums">
                  {new Intl.NumberFormat("ru-RU", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(item.unitPrice * item.quantity)}
                  $
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center pt-4 border-zinc-100 border-t">
        <span>Итого шт: {cart.totalQuantity}</span>
        <span className="text-xl font-semibold">
          {formatNumbers.format(cart.totalPrice)}
        </span>
      </div>
      <div className="flex flex-row justify-end">
        <Link
          href={"/purchase"}
          className=" px-4 py-2 text-black hover:bg-zinc-900 transition-colors duration-300. relative isolate inline-block border-b-2 border-current animate-pulse hover:text-white hover:border-transparent   hover:animate-none duration-400 before:content-[''] before:absolute before:inset-0 before:-z-10 before:scale-x-0 before:bg-black before:origin-left before:transition-transform before:ease-out before:duration-400 hover:before:scale-x-100"
        >
          Оформить покупку
        </Link>
      </div>
    </div>
  );
});
