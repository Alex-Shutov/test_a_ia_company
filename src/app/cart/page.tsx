import CartContent from "../_components/CartContent";

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-6xl py-8">
      <h1 className="text-2xl font-semibold">Корзина</h1>
      <div className="rounded-2xl px-8 py-4 w-full bg-white my-2   text-black">
        <CartContent />
      </div>
    </main>
  );
}
