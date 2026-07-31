/* Service worker cơ bản — cache app để mở offline được 💗
   Khi sửa code, tăng số version bên dưới lên 1 để iPhone tải bản mới. */
const CACHE_NAME = "anhiu-budget-v4";
const CORE_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./photo.jpg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(CORE_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      // Có trong cache thì trả ngay (mở offline), đồng thời tải bản mới về cho lần sau
      const fetched = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200 && (e.request.url.startsWith(self.location.origin) || e.request.url.includes("fonts."))) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});
