// Kardivo service worker: installable shell, offline fallback, and admin push notifications.
const CACHE = "kardivo-shell-v51";
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
    // Network-first. Remember the SPA shell so the cart still opens offline; offline.html is the last resort.
    e.respondWith(
      fetch(req)
        .then((r) => {
          if (r.ok && url.pathname === "/") {
            const copy = r.clone();
            caches.open(CACHE).then((c) => c.put("/", copy));
          }
          return r;
        })
        .catch(async () => (url.pathname.startsWith("/admin") ? null : await caches.match("/")) || caches.match("/offline.html")),
    );
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
// Pushes carry no payload; ask the server what happened. A customer's order update (last 2 minutes) wins;
// otherwise this is an admin alert (works because the admin is logged in on this device).
self.addEventListener("push", (e) => {
  const get = (u) =>
    fetch(u, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}));
  e.waitUntil(
    Promise.all([get("/api/me/push-latest"), get("/api/admin/push-latest")]).then(([mine, adm]) => {
      const n = mine && mine.id ? { ...mine, tag: "kardivo-order-" + mine.id } : adm && adm.id ? { ...adm, tag: "kardivo-" + adm.id } : null;
      return self.registration.showNotification(n ? n.title : "Kardivo", {
        body: n ? n.body || "" : "You have a new update.",
        icon: "/icons/icon-192.png",
        badge: "/icons/icon-192.png",
        tag: n ? n.tag : "kardivo",
        data: { url: (n && n.url) || "/" },
      });
    }),
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
