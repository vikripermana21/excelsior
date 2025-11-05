<template>
  <footer>
    <hr />
    <div class="footer-wrapper">
      <div class="main-footer">
        <p class="title">Excelsior</p>
      </div>
      <div>
        <p>Home</p>
        <p>About</p>
        <p>Menu</p>
        <p>Our Story</p>
      </div>
      <div>
        <p>Park Avenue, 8018 NY, USA</p>
        <br />
        <p>+39-926-1234567</p>
        <p>info@excelsior.com</p>
      </div>
    </div>

    <p>2025 &copy; All right reserved</p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  line-height: 2rem;
}

.footer-wrapper {
  @include breakpoints.break(xl) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
  }

  @include breakpoints.break(xs) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

.main-footer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    font-size: 2rem;
    font-family: "Monsieur La Doulaise", cursive;
  }
}
</style>
