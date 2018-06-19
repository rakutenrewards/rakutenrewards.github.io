const sass = require('@zeit/next-sass')();

module.exports = Object.assign({}, sass, {
  exportPathMap: () => ({
    '/': { page: '/' },
  }),
});
