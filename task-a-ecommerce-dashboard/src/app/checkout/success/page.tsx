import type { Metadata } from "next";
import { CheckoutSuccess } from "@/components/cart/CheckoutSuccess";

export const metadata: Metadata = {
  title: "Checkout complete",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccess />;
}
