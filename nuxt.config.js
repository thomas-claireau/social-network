export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'frontend-social-network',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~assets/scss/global.scss', '~assets/scss/animation.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/vue-frag.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@aceforth/nuxt-optimized-images'],

  optimizedImages: {
    handleImages: ['jpeg', 'png'],
    optimizeImages: true,
    optimizeImagesInDev: true,
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
