"use client";

import CartContent from "@/app/_components/CartContent";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CartModal() {
  const pathname = usePathname();

  return pathname === "/cart" ? <CartDialog /> : null;
}

function CartDialog() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="cart-header"
      className="m-auto w-[min(90vw,48rem)] rounded-2xl bg-white text-black backdrop:blur-2xl"
      onCancel={(event) => {
        event.preventDefault();
        window.history.back();
      }}
    >
      <div className="px-4 py-8 flex max-h-[85vh] flex-col">
        <header className="flex flex-row justify-between items-center border-b border-zinc-300 px-5 py-4">
          <h2 id="cart-header" className="text-2xl font-semibold">
            Корзина
          </h2>
          <button
            type="button"
            className="grid place-content-center rounded-full bg-zinc-100 hover:bg-zinc-300 text-xl w-10 h-10"
            aria-label="Закрыть"
            onClick={() => window.history.back()}
          >
            <span className="-top-0.5 relative">x</span>
          </button>
        </header>
        <div className="min-h-0 overflow-y-auto px-5 py-4">
          <CartContent />
        </div>
      </div>
    </dialog>
  );
}
