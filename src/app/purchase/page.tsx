import Link from "next/link";

export default function PurchasePage() {
  return (
    <main className="mx-auto w-full max-w-6xl  py-8">
      <h1 className="text-2xl font-semibold mb-2">Оформление заказа</h1>

      <section className="space-y-4 rounded-2xl bg-white p-6 text-zinc-900">
        <p className="text-zinc-600">Оформление заказа</p>
        <Link href="/cart" className="inline-block underline">
          Вернуться в корзину
        </Link>
      </section>
    </main>
  );
}
