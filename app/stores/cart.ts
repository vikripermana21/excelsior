import { defineStore } from "pinia";
import type { ICart, IProduct } from "~/interfaces";

export const useCartStore = defineStore(
  "cart",
  () => {
    const carts = ref<ICart[]>([]);

    const addToCart = (value: IProduct) => {
      if (carts.value.some((item) => item.name === value.name)) {
        let filtered = carts.value.find((i) => i.name === value.name);
        if (!filtered) return;
        filtered.amount++;
      } else {
        carts.value.push({ ...value, amount: 1 });
      }
    };

    const increaseAmount = (value: IProduct) => {
      let filtered = carts.value.find((i) => i.name === value.name);
      if (!filtered) return;
      filtered.amount++;
    };

    const decreaseAmount = (value: IProduct) => {
      let filtered = carts.value.find((i) => i.name === value.name);
      if (!filtered || filtered.amount <= 1) return;
      filtered.amount--;
    };

    const remove = (value: IProduct) => {
      let filtered = carts.value.filter((item) => item.name != value.name);
      if (!filtered) return;
      carts.value = filtered;
    };

    const getTotalPrice = () => {
      if (carts?.value.length == 0) return 0;
      return carts?.value
        .map((item) => item.amount * item.price)
        .reduce((acc, curr) => acc + curr);
    };

    const reset = () => {
      carts.value = [];
    };

    return {
      carts,
      addToCart,
      increaseAmount,
      decreaseAmount,
      remove,
      getTotalPrice,
      reset,
    };
  },
  { persist: true },
);
