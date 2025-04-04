const cacheName = 'cache-v1';

const files = [
    '/gomoku/',
    'index.html',
    'css/style.css',
    'js/gomoku.js',
    'js/evaluation.js',
    'js/threats.js',
    'js/ai.js',
    'js/ui.js',
    'fonts/roboto-regular.woff',
    'fonts/roboto-bold.woff'
];

self.addEventListener('install', event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            await cache.addAll(files);
        })()
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys
                    .filter(key => key !== cacheName)
                    .map(key => caches.delete(key))
            );
        })()
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        (async () => {
            try {
                return await fetch(event.request);
            } catch {
                return caches.match(event.request);
            }
        })()
    );
});