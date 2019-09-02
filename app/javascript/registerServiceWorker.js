import api from 'api/api';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function setupPushManager(registration, vapidPublicKey) {
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  return registration.pushManager.getSubscription().then(subscription => {
    if (subscription) {
      return subscription;
    }

    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey
    });
  });
}

export default function registerServiceWorker(vapidPublicKey) {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);

          return setupPushManager(registration, vapidPublicKey)
            .then(subscription => {
              console.log('Push manager subscribed: ', subscription);

              return api.subscribeForWebPush({ subscription: subscription });
            })
            .catch(error => {
              console.log('Push manager subscription failed: ', error);
            });
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  // check if the browser supports notifications
  if (!('Notification' in window)) {
    console.error('This browser does not support desktop notification');
  }
  // check whether notification permissions have already been granted
  else if (Notification.permission === 'granted') {
    console.log('Permission to receive notifications has been granted');
  }
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        console.log('Permission to receive notifications has been granted');
      }
    });
  }

  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel('sw-messages');
    channel.addEventListener('message', event => {
      if ('PushSubscriptionChange' === event.data.type) {
        console.log(`Received subcription change event`);
        return api.subscribeForWebPush({
          subscription: event.data.subscription
        });
      }
    });
  }
}
