// Offline support. Network first (so updates show up right away), cache as a fallback.
const CACHE = 'mia-review-v15';
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
  'js/visuals-measure.js', 'js/units/math/measure.js', 'js/units/math/time.js', 'js/units/math/data.js',
  'js/units/science/machines.js', 'js/units/science/weather.js',
  'js/rewards.js', 'js/units/science/materials.js',
  'js/units/g3/science/magnets.js', 'js/units/g3/science/rocks.js', 'js/units/g3/social/provinces.js', 'js/units/g3/social/community.js', 'js/summary.js', 'js/units/french/echo.js', 'js/units/french/echo-mia.js', 'js/units/g3/french/echo-farrah.js', 'js/units/g3/french/cuisine.js', 'js/units/g3/french/histoires.js',
  'js/units/g3/math/perimeter.js', 'js/units/g3/math/kitchen.js', 'js/units/g3/math/time3.js', 'js/units/g3/math/data3.js', 'js/units/math/coding.js',
  'js/units/social/thennow.js', 'js/units/social/world.js',
  'js/units/g3/science/structures.js', 'js/units/g3/science/soils.js',
  'js/mix.js', 'js/units/math/money2.js', 'js/units/math/numbers200.js', 'js/units/math/fractions2.js',
  'js/units/g3/science/plants.js', 'js/units/g3/science/forces.js',
  'js/units/g3/social/ontario.js', 'js/units/g3/social/longago.js',
  'js/units/g3/french/danse.js', 'js/units/g3/french/journal.js',
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
