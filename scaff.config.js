const { getArgv } = require('process-env-argv');

const { mode } = getArgv('--');

const host = {
  dev: `http://oss.vue-scaff.com`,
  prod: `http://oss.vue-scaff.com`,
}[mode || `dev`];

module.exports = {
  uni: true,

  host,

  main: {
    app: `App.vue`,
    mount: `#app`,
  },

  registry: {
    host: true,
  },

  extract: {
    util: '/utils/*.js',
    store: '/stores/*.js',
    custom: '/custom/*.js',

    // util: '/utils/*.js',
    // filter: '/filters/*.js',
    // directive: '/directives/*.js',
    // route: '/pages/**/route.js',
    // store: '/pages/**/store.js',
    // component: '/components/*.vue',
    // style: '/variables.scss',
    // i18n: '/i18n/*.js',
  },

  theme: {
    'primary-color': '#ec2c34',
  },

  lessVariables: '/variables.module.less',

  // 构建时插件
  // plugins: [],

  // 依赖拓展
  // extensions: [],
};
