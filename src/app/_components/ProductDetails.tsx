"use client";
import type { GetProductDetailsQuery } from "@/lib/graphql/generated";
import { fetchProduct } from "@/lib/graphql/products";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Chip from "./Chip";
import ProductGallery from "./ProductGallery";
import { useStores } from "@/stores/StoreProvider";
import CartDetailButton from "./CartDetailButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type LoadState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; data: GetProductDetailsQuery };

const signal = new AbortController().signal;

export default function ProductDetails({ id }: { id: number }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const [state, setState] = useState<LoadState>({ status: "loading" });
  const colorId = Number(searchParams.get("colorId")) ?? null;
  const requestedSizeId = Number(searchParams.get("sizeId"));

  const { cart } = useStores();
  useEffect(() => {
    let ignore = false;
    fetchProduct(id)
      .then((data) => {
        !ignore && setState({ status: "success", data });
      })
      .catch(() => {
        !ignore && setState({ status: "error" });
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  if (state.status === "loading") {
    return (
      <div className="space-y-2 py-2">
        <p className="text-md text-zinc-600 text-center">Загружаем товар…</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="space-y-2 py-2">
        <p className="text-lg font-semibold text-center text-zinc-800">
          Не удалось загрузить товар
        </p>
        <p className="text-md text-zinc-600 text-center">Обновите страницу</p>
      </div>
    );
  }

  const { product, sizes } = state.data;

  if (!product) {
    return (
      <div className="space-y-2 py-2">
        <p className="text-lg font-semibold text-center text-zinc-800">
          Не нашли товар по данному идентификатору
        </p>
        <p className="text-md text-zinc-600 text-center">
          Проверьте url или&nbsp;
          <Link
            href={"/"}
            className="relative isolate inline-block px-2 py-1 border-b-2 border-current animate-pulse hover:text-white hover:border-transparent transition-colors hover:animate-none duration-400 before:content-[''] before:absolute before:inset-0 before:-z-10 before:scale-x-0 before:bg-black before:origin-left before:transition-transform before:ease-out before:duration-400 hover:before:scale-x-100"
          >
            Вернитесь в каталог
          </Link>
        </p>
      </div>
    );
  }

  const color =
    product.colors.find((el) => el.id === colorId) ?? product.colors[0];
  const sizeId = color.sizes.includes(requestedSizeId) ? requestedSizeId : null;

  const handleAdd = () => {
    const findedSize = sizes.find((el) => el.id === sizeId);
    if (!color || !sizeId || !findedSize) return;
    cart.addItem({
      productId: product.id,
      productName: product.name,
      colorId: color.id,
      colorName: color.name,
      image: color.images[0],
      sizeId,
      sizeName: findedSize.name,
      unitPrice: Number(color.price),
    });
    console.log("После добавления", cart, cart.cart.size);
  };

  const setSizeId = (size: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (size === null) {
      params.delete("sizeId");
    } else {
      if (!color?.sizes.includes(size)) return;
      params.set("colorId", color.id.toString());
      params.set("sizeId", size.toString());
    }
    router.replace(
      params.toString() ? `${pathName}?${params.toString()}` : `${pathName}`,
      { scroll: false },
    );
  };

  const setColorId = (color: number | null) => {
    const params = new URLSearchParams(searchParams);
    if (color === null) {
      params.delete("colorId");
    } else {
      params.set("colorId", String(color));
    }
    params.delete("sizeId");
    router.replace(
      params.toString() ? `${pathName}?${params.toString()}` : `${pathName}`,
      { scroll: false },
    );
  };

  return (
    <div className="grid text-black items-start grid-cols-1 md:grid-cols-2 ">
      <ProductGallery
        key={color?.id ?? "no-color"}
        images={color?.images ?? []}
        name={product.name}
      />

      <div className="p-4">
        <p className="text-md text-zinc-600">{product.brand}</p>
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-xl font-bold">
          {color.price ? color.price + " $" : "Цена не указана"}{" "}
        </p>
        {color?.description && (
          <p className="space-y-2 tracking-wider">{color.description}</p>
        )}
        <div>
          <h3 className="font-semibold my-2">Цвет</h3>
          <div className=" flex flex-wrap gap-4">
            {product.colors.map((el) => (
              <Chip
                aria-pressed={el.id === color?.id}
                key={el.id}
                onClick={() => {
                  if (el.id === color?.id) return;
                  setColorId(el.id);
                }}
              >
                {el.name}
              </Chip>
            ))}
          </div>
          <h3 className="font-semibold my-2">Размер</h3>
          <div className=" flex flex-wrap gap-4 mb-4">
            {sizes.length ? (
              sizes.map((el) => (
                <Chip
                  disabled={!color.sizes.includes(el.id)}
                  aria-pressed={el.id === sizeId}
                  key={el.id}
                  onClick={() => {
                    if (el.id === sizeId) return;
                    setSizeId(el.id);
                  }}
                >
                  {el.name}
                </Chip>
              ))
            ) : (
              <div className="text-zinc-400 font-medium">
                Размерный ряд закончился
              </div>
            )}
          </div>
          <CartDetailButton
            productId={product.id}
            colorId={color.id}
            sizeId={sizeId}
            onAdd={handleAdd}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
