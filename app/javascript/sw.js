// Base service worker extended by workbox in webpack

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * Precache /users html for offline.
 */
workbox.precaching.precacheAndRoute([{ url: '/users' }]);

/**
 * Tell workbox to use the "/users" cached HTML for requests navigations that start with "/users"
 */
workbox.routing.registerNavigationRoute('/users', {
  whitelist: [new RegExp('^/users')]
});

/**
 * Runtime caching of JSON APIs.
 */
workbox.routing.registerRoute(
  /\.json$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api'
  })
);

/**
 * Runtime caching of asset pipeline files.
 */
workbox.routing.registerRoute(
  new RegExp('/assets/.+(?:js|css|jpg)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'assets'
  })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
