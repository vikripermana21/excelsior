<script setup lang="ts">
const props = defineProps(["name", "image", "price"]);
const emit = defineEmits(["addToCart"]);

const handleAddToCart = () => {
  emit("addToCart");
};
</script>
<template>
  <div class="product-card">
    <div class="information-wrapper">
      <NuxtImg
        fit="cover"
        :src="props.image"
        width="300"
        height="300"
        format="webp"
        placeholder="https://placehold.co/300x300"
        placeholder-class="animate-pulse"
        :alt="props.name"
      />
      <div>
        <p class="name">{{ props.name }}</p>
        <p class="price">${{ props.price }}</p>
      </div>
    </div>
    <button class="cart-cta" @click="handleAddToCart">Add to cart</button>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  padding: 0.5rem;
  background-color: colors.$secondary-color;
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 1rem;
  .information-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div {
      display: grid;
      grid-template-columns: 150px auto;
      p {
        color: colors.$primary-color;
      }

      .name {
        font-size: 1.2rem;
        word-break: break-words;
      }
      .price {
        font-size: 1rem;
        text-align: right;
      }
    }
  }
}

.cart-cta {
  padding: 0.5rem 1rem;
  outline: none;
  background-color: colors.$primary-color;
  cursor: pointer;
  border: none;
}
</style>
