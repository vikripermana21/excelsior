<script lang="ts" setup>
import { useMenuStore } from "@/stores/menu";
import { useCartStore } from "@/stores/cart";
import type {
  CategoryResponse,
  IMeal,
  IProduct,
  MealResponse,
} from "~/interfaces";
import { storeToRefs } from "pinia";
import { useToast } from "~/composables/useToasts";

const config = useRuntimeConfig();
const store = useMenuStore();
const cartStore = useCartStore();
const toast = useToast();

const { search, category } = storeToRefs(store);

const { data, status } = useFetch<CategoryResponse>(
  `${config.public.baseApiUrl}/categories.php`,
);

const { data: products, status: productStatus } = useFetch(
  `${config.public.baseApiUrl}/search.php`,
  {
    query: { s: search },
    transform: (data: MealResponse): IProduct[] | [] => {
      if (!data.meals) return [];

      return data.meals.map((item: IMeal) => ({
        name: item.strMeal,
        image: item.strMealThumb,
        price:
          Math.abs(
            item.strMeal
              .split("")
              .reduce((acc: number, char) => acc + char.charCodeAt(0), 0),
          ) % 100,
      }));
    },
  },
);

const { data: filteredProducts, status: filteredProductsStatus } = useFetch(
  `${config.public.baseApiUrl}/filter.php`,
  {
    query: { c: category },
    transform: (data: MealResponse): IProduct[] | [] => {
      if (!data.meals) return [];

      return data.meals.map((item: IMeal) => ({
        name: item.strMeal,
        image: item.strMealThumb,
        price:
          Math.abs(
            item.strMeal
              .split("")
              .reduce((acc: number, char) => acc + char.charCodeAt(0), 0),
          ) % 100,
      }));
    },
  },
);

const handleInput = (e: any) => {
  store.setSearch(e.target.value);
};

const handleAddToCart = (value: IProduct) => {
  toast.success("Successfully added to cart");
  cartStore.addToCart(value);
};

onUnmounted(() => {
  store.setSearch("");
  store.setCategory("");
});
</script>

<template>
  <div class="menu">
    <div class="filter-wrapper">
      <input
        type="text"
        placeholder="Search food..."
        :value="search"
        @input="handleInput"
      />
      <hr />
      <div class="categories">
        <template v-if="status === 'pending'">
          <div class="loading">
            <p>Fetching...</p>
          </div>
        </template>

        <template v-if="status == 'success'" v-for="item in data?.categories">
          <span
            class="category-pill"
            :class="{ active: item.strCategory === category }"
            @click="store.setCategory(item.strCategory)"
          >
            {{ item.strCategory }}</span
          >
        </template>
      </div>
    </div>
    <div class="product-wrapper">
      <!-- Products-->
      <template v-if="!category">
        <template v-if="productStatus === 'pending'">
          <div class="loading">
            <Icon name="line-md:loading-loop" />
            <p>Fetching...</p>
          </div>
        </template>
        <template v-else-if="products == null || products.length === 0">
          <div class="not-found">
            <Icon name="iconoir:file-not-found" />
            <p>Data not found.</p>
          </div>
        </template>
        <template v-else v-for="product in products">
          <ProductCard
            :name="product.name"
            :image="product.image"
            :price="product.price"
            @add-to-cart="handleAddToCart(product)"
          />
        </template>
      </template>
      <!-- Products-->

      <!-- Product Category -->
      <template v-if="category">
        <template v-if="filteredProductsStatus === 'pending'">
          <div class="loading">
            <Icon name="line-md:loading-loop" />
            <p>Fetching...</p>
          </div>
        </template>
        <template
          v-else-if="filteredProducts == null || filteredProducts.length === 0"
        >
          <div class="not-found">
            <Icon name="iconoir:file-not-found" />
            <p>Data not found.</p>
          </div>
        </template>
        <template v-else v-for="product in filteredProducts">
          <ProductCard
            :name="product.name"
            :image="product.image"
            :price="product.price"
            @add-to-cart="handleAddToCart(product)"
          />
        </template>
      </template>
      <!-- Product Category -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  padding: 90px 1rem 1rem 1rem;
  gap: 3rem;
  position: relative;

  @include breakpoints.break(xl) {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }

  @include breakpoints.break(md) {
    display: flex;
    flex-direction: column;
  }

  .filter-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 0.5rem 1rem;
      outline: none;
      border: none;
      background-color: transparent;
    }

    .categories {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      .category-pill {
        font-size: 0.8rem;
        padding: 0.5rem 1rem;
        border: 1px solid colors.$alternative-color;
        border-radius: 100px;
        color: colors.$alternative-color;

        &.active {
          background-color: colors.$secondary-color;
          color: colors.$primary-color !important;
        }

        &:hover {
          color: colors.$secondary-color;
          border-color: colors.$secondary-color;
          cursor: pointer;
        }
      }
    }
  }

  .product-wrapper {
    display: grid;
    gap: 1rem;

    .loading {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      grid-column-start: 1;
      grid-column-end: 5;
      gap: 1rem;
    }

    .not-found {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      grid-column-start: 1;
      grid-column-end: 5;
      gap: 1rem;

      span {
        font-size: 2rem;
      }
    }

    @include breakpoints.break(xl) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @include breakpoints.break(md) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @include breakpoints.break(sm) {
      grid-template-columns: 1fr 1fr;
    }

    @include breakpoints.break(xs) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
