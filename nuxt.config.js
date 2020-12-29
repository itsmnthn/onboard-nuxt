const uiconfig = require('./config/uiconfig')
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'onboard-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
  },
  /*
   ** Environment variables
   */
  env: {
    uiconfig: JSON.stringify(uiconfig),
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '~/plugins/app-init',
      ssr: false,
    }, // Initialize local app
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  /**
   * SSR
   */
  render: {
    ssr: false,
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // extractCSS
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 100000,
        maxSize: 3000000,
        maxAsyncRequests: 10,
      },
    },

    splitChunks: {
      pages: true,
      vendor: true,
      commons: true,
      runtime: false,
      layouts: false,
    },
    extend(config, ctx) {},
  },
}
