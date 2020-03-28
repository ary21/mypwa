var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/css/bootstrap.min.css',
  '/js/main.js',
  '/js/bootstrap.min.js',
  '/js/jquery-3.4.1.min.js',
  '/img/picture.jpg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName != CACHE_NAME
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
});