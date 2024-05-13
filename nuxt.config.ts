// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/main.css"],
  devServer: {
    port: 4444,
  },
  colorMode: { preference: "light", fallback: "light" },
  modules: [
    "@nuxt/ui",
    "@vueuse/motion/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
    "nuxt-tiptap-editor",
    "@nuxt/image",
    ["@pinia/nuxt", { autoImports: ["defineStore", "defineStore"] }],
  ],
  tiptap: {
    prefix: "Tiptap",
  },
  ui: {
    global: true,
  },

  runtimeConfig: {
    public: {
      baseUrl: "https://api.ystfamily.com/api",
      imageUrl: "https://api.ystfamily.com/img/",
    },
  },
});
