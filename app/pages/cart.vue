<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useToast } from "~/composables/useToasts";
import { storeToRefs } from "pinia";

const toast = useToast();
const store = useCartStore();

const { carts } = storeToRefs(store);

const handleSubmit = () => {
  toast.success("Your order has been processed");
  store.reset();
};
</script>
<template>
  <div class="cart">
    <template v-if="carts.length == 0">
      <div class="not-found">
        <p>There is nothing here.</p>
        <NuxtLink to="/menu">Add something to cart</NuxtLink>
      </div>
    </template>
    <template v-else>
      <div class="items-wrapper">
        <template v-for="item in carts" :key="item.name">
          <CartItem
            :name="item.name"
            :image="item.image"
            :amount="item.amount"
            :price="item.amount * item.price"
            @increase="store.increaseAmount(item)"
            @decrease="store.decreaseAmount(item)"
            @remove="store.remove(item)"
          />
        </template>
      </div>
      <hr />
      <div class="price-wrapper">
        <p>Total Price</p>
        <p class="total">${{ store.getTotalPrice() }}</p>
      </div>
      <button class="checkout-cta" @click="handleSubmit">Checkout now</button>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.cart {
  max-width: 768px;
  margin: auto;
  padding: 90px 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .not-found {
    height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    p {
      color: grey;
    }

    a {
      color: lightblue;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .items-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .price-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    .total {
      font-size: 3rem;
      font-weight: 800;
    }
  }

  .checkout-cta {
    width: 100%;
    padding: 1rem 0;
    border-radius: 100px;
    outline: none;
    border: none;
    color: colors.$primary-color;
    cursor: pointer;
  }
}
</style>
