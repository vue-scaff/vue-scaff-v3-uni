module.exports = {
  uni: true,

  main: {
    app: `App.vue`,
    mount: `#app`,
  },

  registry: {
    host: true,
  },

  extract: {
    util: '/utils/*.js',
    custom: '/custom/*.js',
  },

  theme: {
    'primary-color': '#ec2c34',
  },

  lessVariables: '/variables.module.less',

  // util: '/utils/*.js',
  // filter: '/filters/*.js',
  // directive: '/directives/*.js',
  // route: '/pages/**/route.js',
  // store: '/pages/**/store.js',
  // component: '/components/*.vue',
  // style: '/variables.scss',
  // i18n: '/i18n/*.js',

  // 构建时插件
  // plugins: [],

  // 依赖拓展
  // extensions: [],
};
