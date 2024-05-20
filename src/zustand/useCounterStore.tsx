import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const counterStore = (set: any) => ({
  count: 0 as number,
  increment: (value: number) =>
    set((state: { count: number }) => ({ count: state.count + value })),
  decrement: (value: number) =>
    set((state: { count: number }) => ({ count: state.count - value })),
  reset: () => set({ count: 0 }),
});

const useCounter = create(
  devtools(
    persist(counterStore, {
      name: "counterStore",
    })
  )
);
export default useCounter;
