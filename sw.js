// ═══════════════════════════════════════════════
//  SERVICE WORKER — Absensi HR PWA
//  Versi: 2.0.0 — GitHub Pages /absenids/
// ═══════════════════════════════════════════════

const CACHE_NAME = 'absensi-hr-v2';
const BASE = '/absenids/';
const CACHE_URLS = [
  BASE,
  BASE + 'absensi-karyawan.html',
  BASE + 'manifest.json',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png',
  'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// ── INSTALL ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        CACHE_URLS.map(url => cache.add(url).catch(e => console.warn('[SW] skip:', url)))
      )
    ).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-first, network fallback ──
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  if(event.request.url.startsWith('chrome-extension://')) return;
  // Skip Supabase API calls — always network
  if(event.request.url.includes('supabase.co')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      // Stale-while-revalidate
      const fetchFresh = fetch(event.request).then(res => {
        if(res && res.status === 200 && res.type !== 'opaque'){
          caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => null);

      return cached || fetchFresh.then(res => res || caches.match(BASE + 'absensi-karyawan.html'));
    })
  );
});
