// Kardivo service worker: installable shell, offline fallback, and admin push notifications.
const CACHE = "kardivo-shell-v18";
const SHELL = ["/offline.html", "/icons/icon-192.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  const req = e.request,
    url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/media/")) return; // never cache data
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(() => caches.match("/offline.html")));
    return;
  }
  if (/\.(css|js|png|svg|webmanifest)$/.test(url.pathname)) {
    // Network-first so a deploy shows up immediately; the cache is only an offline fallback.
    e.respondWith(
      caches.open(CACHE).then(async (c) => {
        try {
          const r = await fetch(req);
          if (r.ok) c.put(req, r.clone());
          return r;
        } catch (err) {
          const hit = await c.match(req);
          if (hit) return hit;
          throw err;
        }
      }),
    );
  }
});
// The push carries no payload. Ask the server what happened (works because the admin is logged in on this device).
self.addEventListener("push", (e) => {
  e.waitUntil(
    fetch("/api/admin/push-latest", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
      .then((a) =>
        self.registration.showNotification(a.title || "Kardivo", {
          body: a.body || "New activity in your store.",
          icon: "/icons/icon-192.png",
          badge: "/icons/icon-192.png",
          tag: a.id ? "kardivo-" + a.id : "kardivo",
          data: { url: a.url || "/" },
        }),
      ),
  );
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || "/";
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) if ("focus" in c) { c.navigate(target); return c.focus(); }
      return self.clients.openWindow(target);
    }),
  );
});
