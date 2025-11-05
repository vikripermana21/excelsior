<template>
  <div class="home">
    <!-- Hero section -->
    <section class="jumbotron">
      <p class="hero-text">Excelsior</p>
      <Icon
        name="material-symbols-light:arrow-circle-down-rounded"
        class="icon-down animate-bounce"
      />
    </section>
    <!-- Hero section -->

    <!-- About section  -->
    <section class="about">
      <div class="img-wrapper">
        <NuxtImg
          fit="cover"
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340"
        />
      </div>
      <h1 class="font-allura">&mdash; About our restaurant</h1>

      <div class="about-description-container">
        <div>
          <p>
            The menu at a modern seafood restaurant is where tradition meets
            innovation. Chefs incorporate global influences and cutting-edge
            techniques to redefine classic dishes, offering items like ceviches
            with exotic fruit infusions, sushi with unexpected twists, and
            seafood pastas with homemade artisanal sauces.
          </p>
        </div>
        <div>
          <p>
            Freshness is paramount; the chefs often source local, seasonal fish
            and shellfish, ensuring the highest quality and flavor. To cater to
            diverse palates, the menu may also feature plant-based or
            alternative protein options that align with current dietary trends.
          </p>
        </div>
      </div>
    </section>
    <!-- About section  -->

    <!-- Dishes section -->
    <section class="dishes">
      <h1 class="font-allura">&mdash; Our top dish</h1>
      <div class="dishes-wrapper">
        <NuxtImg
          src="https://images.unsplash.com/photo-1713759980521-5315136dd958?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1480"
        />
        <div>
          <h1>Nakama Signature Combo</h1>
          <p>
            The Nakama Signature Combo celebrates the day’s best catch with a
            chef‑curated lineup of sashimi and nigiri, bright ceviche kissed
            with seasonal citrus and exotic fruit, and a warm seafood bite
            finished with our artisanal sauce. Balanced textures, clean flavors,
            and a touch of innovation make this a perfect shareable
            centerpiece—showcasing peak freshness and modern technique in one
            elegant platter.
          </p>
          <NuxtLink to="/menu" class="cta">See other dishes!</NuxtLink>
        </div>
      </div>
    </section>
    <!-- Dishes section -->
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}

.icon-down {
  position: absolute;
  bottom: 12px;
  font-size: 2rem;
}

.jumbotron {
  position: sticky;
  width: 100vw;
  height: 100vh;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340);

  background-position: center;
  background-size: cover;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @include breakpoints.break(xl) {
    .hero-text {
      font-family: "Monsieur La Doulaise", cursive;
      font-size: 7rem;
    }
  }

  @include breakpoints.break(md) {
    .hero-text {
      font-family: "Monsieur La Doulaise", cursive;
      font-size: 5rem;
    }
  }

  @include breakpoints.break(xs) {
    .hero-text {
      font-family: "Monsieur La Doulaise", cursive;
      font-size: 3rem;
    }
  }
}

.about {
  min-height: 100vh;
  width: 100%;
  background-color: colors.$primary-color;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 1rem;
  top: -900;

  @include breakpoints.break(xl) {
    .img-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      img {
        object-position: center;
        object-fit: cover;
        width: 90vw;
        height: 600px;
      }
    }
  }
  @include breakpoints.break(md) {
    .img-wrapper {
      width: 100%;

      img {
        object-position: center;
        object-fit: cover;
        width: 100%;
        height: 600px;
      }
    }
  }

  .about-description-container {
    @include breakpoints.break(xl) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      padding: 0 8rem;
    }

    @include breakpoints.break(xs) {
      display: flex;
      flex-direction: column;
      gap: 5rem;
      padding: 0;
    }
  }
}

.dishes {
  position: relative;
  background-color: colors.$primary-color;
  z-index: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @include breakpoints.break(lg) {
    .dishes-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;

      img {
        width: 100%;
      }

      div {
        display: flex;
        flex-direction: column;
        gap: 3rem;

        .cta {
          width: fit-content;
          padding: 1rem 2rem;
          background-color: colors.$secondary-color;
          outline: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: colors.$primary-color;
        }
      }
    }
  }

  @include breakpoints.break(xs) {
    .dishes-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
}
</style>
