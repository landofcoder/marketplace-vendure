module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('JWT_SECRET', '28a60729-a897-403c-abe8-8f7d9b1422a6'),
    },
  },
});
