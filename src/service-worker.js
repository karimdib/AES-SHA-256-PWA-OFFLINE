const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    './src/main.js',
    './src/style.scss',
    './src/app.scss',
    './public/android-chrome-192x192.png',
    './public/android-chrome-512x512.png',
    './src/App.vue'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
