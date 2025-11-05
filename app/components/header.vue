<script setup lang="ts">
import { useSidebarStore } from "@/stores/sidebar";
import { useScroll } from "@/composables/useScroll";

const { y } = useScroll();
const route = useRoute();

const store = useSidebarStore();
const links = computed(() => [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Menu",
    path: "/menu",
  },
]);
</script>

<template>
  <div>
    <header :class="{ scrolled: y > 900 || route.name != 'index' }">
      <NuxtLink to="/" class="title">Excelsior</NuxtLink>
      <nav class="links">
        <template v-for="link in links">
          <NuxtLink :to="link.path" active-class="active">{{
            link.name
          }}</NuxtLink>
        </template>
      </nav>
      <nav>
        <NuxtLink to="/cart" active-class="active">
          <Icon name="solar:bag-4-outline" />
        </NuxtLink>
      </nav>
      <div
        class="icon-more"
        @click="store.toggle"
        :class="{ 'rotate-180': store.isOpen }"
      >
        <Icon
          name="material-symbols-light:keyboard-double-arrow-left-rounded"
        />
      </div>
    </header>

    <nav class="mobile-nav" :class="{ 'is-open': store.isOpen }">
      <template v-for="link in links">
        <NuxtLink :to="link.path" active-class="active" @click="store.toggle">{{
          link.name
        }}</NuxtLink>
      </template>
      <NuxtLink to="/cart" @click="store.toggle">Cart</NuxtLink>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: colors.$secondary-color;
  font-weight: 100;
  font-size: 2rem;
  font-family: "Monsieur La Doulaise", cursive;
}

.scrolled {
  background-color: colors.$primary-color;
}

.rotate-180 {
  transform: rotate(180deg);
}

header {
  @include animations.transition-all;

  position: fixed;
  width: 100%;
  z-index: 99;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  padding: 1rem;

  .links {
    flex-grow: 1;
  }
  .icon-more {
    @include animations.transition-all;
    font-size: 1.5rem;
    padding: 5px;
    border-radius: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    cursor: pointer;
  }

  @include breakpoints.break(xl) {
    nav {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .icon-more {
      display: none;
    }
  }

  @include breakpoints.break(xs) {
    nav {
      display: none;
    }
    .icon-more {
      display: flex;
    }
  }
}

.mobile-nav {
  @include animations.transition-all;

  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: colors.$primary-color;
  z-index: 5;
  right: -100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-size: 4rem;

  &.is-open {
    right: 0;
  }

  @include breakpoints.break(xl) {
    display: none;
  }

  @include breakpoints.break(xs) {
    display: flex;
  }
}
</style>
