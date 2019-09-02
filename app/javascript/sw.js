// Base service worker extended by workbox in webpack

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.addEventListener('push', function(event) {
  let json = event.data.json();
  let icon = 'icon-128.png';

  if (['Added', 'Completed'].includes(json.action)) {
    event.waitUntil(
      self.registration.showNotification(`${json.action} ${json.title}`, {
        body: json.user,
        icon: icon
      })
    );
  }

  const channel = new BroadcastChannel('sw-messages');
  channel.postMessage({ type: 'TodoChange' });
});

self.addEventListener('pushsubscriptionchange', event => {
  event.waitUntil(
    self.registration.pushManager
      .subscribe(event.oldSubscription.options)
      .then(subscription => {
        const channel = new BroadcastChannel('sw-messages');
        channel.postMessage({ type: 'PushSubscriptionChange', subscription });
      })
  );
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
