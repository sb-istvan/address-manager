// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Address Manager",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  devtools: { enabled: true },
  modules: ["nuxt-primevue"],
  primevue: {
    options: {
      ripple: true,
      inputStyle: "filled",
    },
    components: {
      include: [
        "InputText",
        "FloatLabel",
        "Checkbox",
        "Button",
        "DataTable",
        "Column",
        "ScrollPanel",
      ],
    },
  },
});
