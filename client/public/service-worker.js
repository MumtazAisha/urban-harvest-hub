const CACHE_NAME = "urban-harvest-static-v3";
const API_CACHE_NAME = "urban-harvest-api-v1";

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

const API_PATHS = ["/products", "/events", "/workshops"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== API_CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  const isApiRequest = API_PATHS.some((path) =>
    requestUrl.pathname.startsWith(path)
  );

  if (isApiRequest) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

async function networkFirst(request) {
  const cache = await caches.open(API_CACHE_NAME);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch {
    const cachedResponse = await cache.match(request);
    return (
      cachedResponse ||
      new Response(JSON.stringify({ error: "Offline data unavailable" }), {
        headers: { "Content-Type": "application/json" },
      })
    );
  }
}