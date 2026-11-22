// Progress lives in this browser only (localStorage). Nothing is sent anywhere.
const KEY = 'miaReview.v1';

const DEFAULTS = () => ({
  settings: { autoRead: true, sound: true, slow: false, lang: 'en' },
  progress: {},
  stickers: [],
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw);
      const base = DEFAULTS();
      return { ...base, ...d, settings: { ...base.settings, ...(d.settings || {}) } };
    }
  } catch { /* private mode or corrupt data: start fresh */ }
  return DEFAULTS();
}

let data = load();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

export const store = {
  data: () => data,
  settings: () => data.settings,
  setSetting(k, v) { data.settings[k] = v; save(); },

  progress: (key) => data.progress[key],

  recordRound(key, { stars, firstTry, total, missed }) {
    const p = data.progress[key] || { best: 0, plays: 0, firstTry: 0, total: 0, missed: [] };
    p.best = Math.max(p.best, stars);
    p.plays += 1;
    p.firstTry += firstTry;
    p.total += total;
    p.last = Date.now();
    p.missed = [...missed, ...(p.missed || [])].slice(0, 8);
    data.progress[key] = p;
    save();
  },

  totalStars: () => Object.values(data.progress).reduce((s, p) => s + (p.best || 0), 0),

  hasSticker: (id) => data.stickers.includes(id),
  addSticker(id) { if (!data.stickers.includes(id)) { data.stickers.push(id); save(); } },

  resetProgress() { data = { ...DEFAULTS(), settings: data.settings }; save(); },
};
