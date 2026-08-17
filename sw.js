/* Service Worker minimal : permet l'installation en app et un hors-ligne basique */
const CACHE = "kidlearn-v1";
const ASSETS = [
  ".",
  "index.html",
  "styles.css",
  "app.js",
  "data.js",
  "manifest.webmanifest",
  "icon.svg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Stratégie : réseau d'abord, repli cache (sauf vidéos externes)
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then((r) => r || caches.match(".")))
  );
});
