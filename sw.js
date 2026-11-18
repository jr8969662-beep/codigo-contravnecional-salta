// Cambiá este número cada vez que publiques cambios: así los usuarios
// que ya tienen la app instalada ven el aviso "Hay una versión nueva".
const VERSION = "v2";
const CACHE = `contrav-salta-${VERSION}`;
const ASSETS = [
  "./",
  "./index.html",
  "./articulos.json",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  // No se activa solo: espera a que el usuario toque "Actualizar".
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Página y artículos: primero la red (siempre lo más nuevo), si no hay internet usa el caché.
  const esContenido = req.mode === "navigate" || url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".json") || url.pathname.endsWith("/");
  if (esContenido) {
    e.respondWith(
      fetch(req).then(resp => {
        if (resp.ok) {
          const copia = resp.clone();
          caches.open(CACHE).then(c => c.put(req, copia));
        }
        return resp;
      }).catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then(r => r || (req.mode === "navigate" ? caches.match("./index.html") : undefined))
      )
    );
    return;
  }

  // Íconos y demás: primero el caché.
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      if (resp.ok) {
        const copia = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copia));
      }
      return resp;
    }))
  );
});
