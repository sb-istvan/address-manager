// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Address Manager",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@vee-validate/nuxt"],
  primevue: {
    options: {
      ripple: true,
      inputStyle: "filled",
    },
    components: {
      include: [
        "InputText",
        "InputNumber",
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
