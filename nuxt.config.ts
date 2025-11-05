// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseApiUrl: "",
    },
  },

  css: ["~/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/colors"; @use "~/assets/scss/animations"; @use "~/assets/scss/breakpoints";`,
          loadPaths: ["assets/scss"],
        },
      },
    },
  },

  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
