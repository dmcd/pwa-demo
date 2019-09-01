import api from 'api/api';

export function urlB64ToUint8Array(base64String) {
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

function setupPushManager(registration, vapid_public_key) {
  return registration.pushManager.getSubscription().then(subscription => {
    if (subscription) {
      return subscription;
    }

    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(vapid_public_key)
    });
  });
}

export default function registerServiceWorker(vapid_public_key) {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);

          return setupPushManager(registration, vapid_public_key).then(
            subscription => {
              return api.subscribeForWebPush({ subscription: subscription });
            }
          );
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
}
