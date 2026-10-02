import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_CART_QUANTITY } from "@/lib/config";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
}

const clampQuantity = (quantity: number) =>
  Math.min(MAX_CART_QUANTITY, Math.max(1, Math.floor(quantity)));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: clampQuantity(i.quantity + quantity) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { product, quantity: clampQuantity(quantity) }] };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: clampQuantity(quantity) } : i,
          ),
        })),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),

      clear: () => set({ items: [] }),
    }),
    { name: "lumen-cart", version: 1 },
  ),
);

/** Derived selectors, kept outside the store so components subscribe to a single primitive. */
export const selectItemCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
