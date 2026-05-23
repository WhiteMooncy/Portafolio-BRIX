// Bump CACHE_VERSION on each deployment to force clients to refresh cached assets
const CACHE_VERSION = '2026-05-23c';
const CACHE_NAME = `whitemooncy-portafolio-${CACHE_VERSION}`;
const PRECACHE_URLS = [
  './',
  './index.html',
  './404.html',
  './colors_and_type.css',
  './components/styles.css',
  './components/data.js',
  './components/app.jsx',
  './components/Primitives.jsx',
  './components/Navbar.jsx',
  './components/Hero.jsx',
  './components/Stats.jsx',
  './components/About.jsx',
  './components/Stack.jsx',
  './components/Projects.jsx',
  './components/Contact.jsx',
  './components/Footer.jsx',
  './assets/favicon.svg',
  './assets/sakura-branch.png',
  './assets/placeholders/about-photo.svg',
  './assets/placeholders/project-thumb.svg',
  './pages/cv.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

// Network First: intenta la red, cae al caché si falla.
// Así los visitantes recurrentes siempre ven contenido actualizado.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  const isNavigation = event.request.mode === 'navigate';

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (isNavigation) return caches.match('./index.html');
          return new Response('', { status: 408, statusText: 'Offline' });
        })
      )
  );
});
