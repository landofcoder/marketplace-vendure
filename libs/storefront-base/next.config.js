const withPWA = require('next-pwa')
module.exports = withPWA({
  env: {
    PUBLIC_URL: "",
    PORT: 9000,
    ADMIN_URL: "http://localhost:3000",
    STRAPI_URL: "http://localhost:1337"
  },
  pwa: {
    dest: 'public'
  }
});
