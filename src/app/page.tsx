import Image from "next/image";
import CatalogView from "./_components/catalog";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-semibold">Товары</h1>
      <CatalogView/>
    </main>
  );
}
