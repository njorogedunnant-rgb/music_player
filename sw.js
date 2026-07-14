// Minimal service worker — mainly here to satisfy PWA "installability"
// criteria in Chrome so the app can be added to your home screen with
// a proper standalone (no browser bar) display mode.
//
// Since everything is served from your phone's own local Termux server,
// there's no real "offline" concern to solve here — the site is already
// as local as it gets. This just does a basic pass-through fetch.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
