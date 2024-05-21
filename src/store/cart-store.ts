import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";

// Define the interface for the cart store
interface CartStore {
  cart: Set[];
  addToCart: (item: Set) => void;
  removeFromCart: (id: string) => void;
}
export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item: Set) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));
