process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const environment = require('./environment');

const workbox = require('./plugins/workbox');
environment.plugins.append('workbox', workbox);

module.exports = environment.toWebpackConfig();
