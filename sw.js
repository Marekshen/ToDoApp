const CACHE = 'todoapp';
const ASSETS = ['./', 'index.html', 'style.css', 'app.js', 'manifest.json', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'no-cache' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

const same = (a, b) => {
  if (a.byteLength !== b.byteLength) return false;
  const x = new Uint8Array(a), y = new Uint8Array(b);
  for (let i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
  return true;
};

let refreshing = null;
function refreshAll() {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    const cache = await caches.open(CACHE);
    let changed = false;
    await Promise.all(ASSETS.map(async url => {
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) return;
        const old = await cache.match(url);
        if (old && same(await res.clone().arrayBuffer(), await old.arrayBuffer())) return;
        await cache.put(url, res);
        if (old) changed = true;
      } catch {}
    }));
    if (changed) (await self.clients.matchAll()).forEach(c => c.postMessage('updated'));
  })().finally(() => { refreshing = null; });
  return refreshing;
}

self.addEventListener('message', e => {
  if (e.data === 'check') e.waitUntil(refreshAll());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') e.waitUntil(refreshAll());
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req)));
});
