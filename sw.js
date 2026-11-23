// Offline support. Network first (so updates show up right away), cache as a fallback.
const CACHE = 'mia-review-v5';
const CORE = [
  './', 'index.html', 'manifest.json', 'css/styles.css',
  'js/app.js', 'js/config.js', 'js/util.js', 'js/storage.js', 'js/speech.js', 'js/sound.js',
  'js/confetti.js', 'js/levels.js', 'js/stickers.js', 'js/visuals.js', 'js/shapes2d.js', 'js/shapes3d.js',
  'js/engine.js', 'js/i18n.js', 'js/subjects.js', 'js/units/common.js',
  'js/units/math/adding.js', 'js/units/math/subtracting.js', 'js/units/math/skipcount.js',
  'js/units/math/shapes2d.js', 'js/units/math/shapes3d.js',
  'js/units/science/animals.js', 'js/units/science/matter.js',
  'js/units/social/map.js', 'js/units/social/traditions.js',
  'js/units/french/mots.js', 'js/units/french/nombres.js',
  'js/mix.js', 'js/units/math/money2.js', 'js/units/math/numbers200.js', 'js/units/math/fractions2.js',
  'js/profiles.js', 'js/subjects-g3.js', 'js/visuals3.js',
  'js/units/g3/math/multiply.js', 'js/units/g3/math/divide.js', 'js/units/g3/math/addsub.js',
  'js/units/g3/math/numbers.js', 'js/units/g3/math/fractions.js', 'js/units/g3/math/money.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })),
  );
});
