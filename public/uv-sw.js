importScripts("/uv2/uv.bundle.js");
importScripts("/uv2/uv.config.js");
importScripts(__uv2$config.sw || "/uv2/uv.sw.js");
const sw = new UV2ServiceWorker();
self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));