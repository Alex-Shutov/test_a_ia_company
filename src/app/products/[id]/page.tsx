import ProductDetails from "@/app/_components/ProductDetails";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-semibold">Товар не найден</h1>
        <Link href="/">Вернуться в каталог</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto lg:min-w-6xl min-w-full py-8 ">
      <div className="bg-white rounded-2xl min-h-96 flex flex-col justify-center py-4">
        <ProductDetails id={productId} />
      </div>
    </div>
  );
}
