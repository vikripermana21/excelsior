import { defineStore } from "pinia";
import { useDebounce } from "@/composables/useDebounce";

export const useMenuStore = defineStore("menu", () => {
  const search = ref("");
  const category = ref("");

  const setSearch = useDebounce((value: string) => {
    search.value = value;
    category.value = "";
  }, 500);

  const setCategory = (value: string) => {
    if (category.value == value) {
      category.value = "";
    } else {
      search.value = "";
      category.value = value;
    }
  };

  return { search, category, setSearch, setCategory };
});
