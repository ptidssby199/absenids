// ═══════════════════════════════════════════════
//  SERVICE WORKER — Absensi HR PWA
//  Versi: 1.0.0
// ═══════════════════════════════════════════════

const CACHE_NAME = 'absensi-hr-v1';
const CACHE_URLS = [
  './absensi-karyawan.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://unpkg.com/@zxing/library@0.19.1/umd/index.min.js'
];

// ── INSTALL: Cache semua aset ──
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell');
      // Cache satu per satu agar tidak gagal total jika satu URL error
      return Promise.allSettled(
        CACHE_URLS.map(url => cache.add(url).catch(err => console.warn('[SW] Failed to cache:', url, err)))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: Hapus cache lama ──
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => { console.log('[SW] Deleting old cache:', key); return caches.delete(key); })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-first, fallback network ──
self.addEventListener('fetch', event => {
  // Skip non-GET and chrome-extension
  if(event.request.method !== 'GET') return;
  if(event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached){
        // Serve from cache, update in background
        const fetchUpdate = fetch(event.request).then(response => {
          if(response && response.status === 200 && response.type !== 'opaque'){
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
          return response;
        }).catch(() => {});
        return cached;
      }
      // Not in cache, try network
      return fetch(event.request).then(response => {
        if(!response || response.status !== 200) return response;
        // Cache the new resource
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        // Offline fallback: return main HTML
        if(event.request.destination === 'document'){
          return caches.match('./absensi-karyawan.html');
        }
      });
    })
  );
});

// ── BACKGROUND SYNC (opsional) ──
self.addEventListener('sync', event => {
  if(event.tag === 'sync-attendance'){
    console.log('[SW] Background sync: attendance');
  }
});

// ── PUSH NOTIFICATIONS (opsional, untuk masa depan) ──
self.addEventListener('push', event => {
  if(!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title || 'Absensi HR', {
    body: data.body || '',
    icon: './icon-192.png',
    badge: './icon-192.png'
  });
});
