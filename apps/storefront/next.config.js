// next.config.js
const withPlugins = require('next-compose-plugins');
const pwa = require('next-pwa');
const tm = require('next-transpile-modules')(['@bavaan/storefront-base','@bavaan/graphql']);

module.exports = withPlugins([
  [tm],
  [pwa,{
      pwa: {
        dest: 'public'
    }
  }],
  {
    env: {
      PUBLIC_URL: "",
      ADMIN_URL: "http://0.0.0.0:3000",
      STRAPI_URL: ""
    }
  }
]);