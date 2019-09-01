// Base service worker extended by workbox in webpack

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('push', function(event) {
  let json = event.data.json();
  let icon = 'icon-128.png';

  event.waitUntil(
    self.registration.showNotification(json.title, {
      body: json.body,
      icon: icon
    })
  );

  const channel = new BroadcastChannel('sw-messages');
  channel.postMessage({ type: json.type });
});

/**
 * Runtime caching of JSON files
 */
workbox.routing.registerRoute(
  /\.json$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'json'
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
