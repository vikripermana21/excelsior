<script setup lang="ts">
const props = defineProps(["name", "image", "price", "amount"]);
const emit = defineEmits(["increase", "decrease", "remove"]);
</script>
<template>
  <div class="cart-item">
    <NuxtImg
      :src="props.image"
      width="50"
      height="50"
      format="webp"
      quality="50"
      fit="cover"
    />
    <div class="description">
      <div class="info">
        <p class="name">{{ props.name }}</p>
        <div class="amount-wrapper">
          <button @click="emit('decrease')">
            <Icon name="ic:round-minus" />
          </button>
          <p class="amount">{{ props.amount }}</p>
          <button @click="emit('increase')">
            <Icon name="ic:round-plus" />
          </button>
        </div>
      </div>
      <div class="price">
        <div>
          <p>${{ price }}</p>
        </div>
        <button class="delete-cta" @click="emit('remove')">
          <Icon name="uil:times" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  gap: 1rem;

  img {
    border-radius: 6px;
  }
  .description {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    .info {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 1.2rem;
        font-weight: 100;
      }

      .amount-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        button {
          outline: none;
          border: none;
          cursor: pointer;
          background-color: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .amount {
          font-size: 0.8rem;
          color: colors.$alternative-color;
        }
      }
    }

    .price {
      display: flex;
      gap: 1rem;
      div {
        padding: 1rem;
        background-color: rgba($color: colors.$secondary-color, $alpha: 0.2);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-weight: 800;
        }
      }
      .delete-cta {
        outline: none;
        border: none;
        background-color: transparent;
        cursor: pointer;

        span {
          color: rgba($color: red, $alpha: 0.5);
          font-size: 2rem;

          &:hover {
            color: rgba($color: red, $alpha: 1);
          }
        }
      }
    }
  }
}
</style>
