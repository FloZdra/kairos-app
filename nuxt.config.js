export default {
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - kairos-app',
    title: 'kairos-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap',
        as: 'font',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  router: {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true, // proxy only for API
    // credentials: true,
  },
  proxy: {
    '/api/': {
      target: `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
      changeOrigin: true,
    },
    '/api2/': {
      target: `${process.env.BACKEND_HOST}:${process.env.SPRINGBOOT_PORT}`,
      pathRewrite: { '^/api2/': '/api/' },
      changeOrigin: true,
    },
  },
  googleFonts: {
    families: {
      Sora: true,
      Roboto: true,
    },
    display: 'swap',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#031284',
          secondary: '#ec4899',
          info: '#facc15',
          warning: '#f97316',
          error: '#dc2626',
          success: '#0ea977',
          shade: '#f3f3f3',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false,
  },
}
