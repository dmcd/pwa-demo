// Base service worker extended by workbox in webpack

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

/**
 * Runtime caching of JSON APIs.
 */
workbox.routing.registerRoute(
  /\.json$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api'
  })
);

/**
 * Runtime caching of asset pipeline files.
 */
workbox.routing.registerRoute(
  new RegExp('/assets/.+(?:js|css|jpg)$'),
  new workbox.strategies.CacheFirst({
    cacheName: 'assets'
  })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
