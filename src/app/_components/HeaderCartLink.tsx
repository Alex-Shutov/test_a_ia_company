"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderCartLink({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <Link
      href="/cart"
      className={className}
      onNavigate={(event) => {
        if (pathname !== "/") return;

        event.preventDefault();
        window.history.pushState(null, "", "/cart");
      }}
    >
      Корзина
    </Link>
  );
}
