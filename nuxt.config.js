export default {
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Kairos',
    title: 'Kairos',
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
    '/api-adonis/': {
      target: `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
      pathRewrite: { '^/api-adonis/': '/api/' },
      changeOrigin: true,
    },
    '/api-spring/': {
      target: `${process.env.SPRINGBOOT_HOST}:${process.env.SPRINGBOOT_PORT}`,
      pathRewrite: { '^/api-spring/': '/api/' },
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

  pwa: {
    icon: {
      source: './static/pwa-icon.png',
      filename: 'pwa-icon.png',
    },
    manifest: {
      name: 'Kairos',
      lang: 'fr',
      theme_color: '#f3f3f3',
      background_color: '#f3f3f3',
      short_name: 'Kairos',
      crossorigin: 'use-credentials',
    },
    meta: {
      name: 'Kairos',
      og: {
        title: 'Kairos',
      },
      theme_color: '#f3f3f3',
      background_color: '#f3f3f3',
      appleStatusBarStyle: 'white',
    },
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
          secondary: '#8250df',
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
