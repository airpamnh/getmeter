const CACHE_NAME = 'pencatatan-air-v1';
const urlsToCache = [
  './index.html',
  './pelanggan.js',
  './manifest.json'
  // Tambahkan file CSS atau gambar pendukung lainnya di sini jika ada
];

// Saat Service Worker dipasang, simpan file ke memori HP (Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Saat aplikasi dibuka, ambil file dari memori HP jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di cache, ambil dari cache. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});

// Membersihkan cache lama jika ada pembaruan versi
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
