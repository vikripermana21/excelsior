<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { storeToRefs } from "pinia";

const store = useCartStore();

const { carts } = storeToRefs(store);
</script>
<template>
  <div class="cart">
    <div class="items-wrapper">
      <template v-for="item in carts" :key="item.name">
        <CartItem
          :name="item.name"
          :image="item.image"
          :amount="item.amount"
          :price="item.amount * item.price"
          @increase="store.increaseAmount(item)"
          @decrease="store.decreaseAmount(item)"
        />
      </template>
    </div>
    <hr />
    <div class="price-wrapper">
      <p>Total Price</p>
      <p class="total">${{ store.getTotalPrice() }}</p>
    </div>
    <button class="checkout-cta">Checkout now</button>
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
