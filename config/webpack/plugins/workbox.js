const { resolve } = require('path');
const workbox = require('workbox-webpack-plugin');

module.exports = new workbox.InjectManifest({
  swSrc: resolve('app', 'javascript', 'sw.js'),
  swDest: resolve('public', 'sw.js')
});
