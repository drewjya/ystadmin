// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 4444,
  },

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
