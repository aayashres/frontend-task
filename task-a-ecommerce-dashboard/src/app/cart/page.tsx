import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight sm:text-4xl">Your cart</h1>
      <CartView />
    </>
  );
}
