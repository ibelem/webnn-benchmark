const pkg = require('./package')

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'all' },
      { name: 'author', content: 'Belem' },
      {
        name: 'keywords',
        content:
          'ai, artificial inligence, machine learning, webml, WebNN, web machine learning, deep learning, tensorflow, tensorflow.js, tf.js, benchmark, webnn benchmark'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      // { src: 'https://bulma.io/lib/navbar.js' }
      // { src: 'https://use.fontawesome.com/releases/v5.1.0/js/all.js' , defer: false },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  router: {
    middleware: 'i18n'
  },

  generate: {
    routes: ['/', '/about', '/zh', '/zh/about']
  },

  /*
  ** Global CSS
  */
  css: ['ant-design-vue/dist/antd.css', '~/assets/css/main.css'],

  /*
  ** Plugins to load before mounting the App
  */

  plugins: [{ src: '@/plugins/antd-ui', ssr: true }, '~/plugins/i18n.js'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    // vendor: ['@/assets/js/ua-parser.min.js', '@/assets/js/environment.js'],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      ctx.loaders.less.javascriptEnabled = true
      ctx.loaders.less.modifyVars = {
        'primary-color': 'rgba(222, 12, 101, 1.0)',
        'component-background': '#262626'
      }
    }
  }
}
