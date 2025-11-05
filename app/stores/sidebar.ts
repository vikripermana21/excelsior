import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", () => {
  const isOpen = ref(false);
  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, toggle };
});
