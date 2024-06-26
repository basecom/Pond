// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    asyncContext: true,
    sharedPrerenderData: true,
    typedPages: true,
    viewTransition: true,
  },
  features: {
    devLogs: true
  },
  future: {
    compatibilityVersion: 4
  }
})
