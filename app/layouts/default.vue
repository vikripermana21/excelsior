<template>
  <div>
    <Header />
    <div class="container">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
</style>
