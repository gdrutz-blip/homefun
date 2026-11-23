// Progress lives in this browser only (localStorage). Nothing is sent anywhere.
// Each kid has her own profile: settings, progress and stickers.
const KEY = 'familyReview.v2';
const OLD_KEY = 'miaReview.v1'; // before profiles existed: everything belonged to Mia

const BASE_SETTINGS = { autoRead: true, sound: true, slow: false, lang: 'en', tapWords: true };
const newProfile = (settings = {}) => ({ settings: { ...BASE_SETTINGS, ...settings }, progress: {}, stickers: [], tricky: [] });

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw);
      return { current: d.current || null, profiles: d.profiles || {} };
    }
    const old = localStorage.getItem(OLD_KEY);
    if (old) {
      const o = JSON.parse(old);
      const mia = newProfile(o.settings);
      mia.progress = o.progress || {};
      mia.stickers = o.stickers || [];
      return { current: null, profiles: { mia } };
    }
  } catch { /* private mode or corrupt data: start fresh */ }
  return { current: null, profiles: {} };
}

let data = load();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

function cur() {
  const id = data.current || 'mia';
  if (!data.profiles[id]) data.profiles[id] = newProfile();
  return data.profiles[id];
}

export const store = {
  currentId: () => data.current,
  /** Switch player. `defaults` are the starting settings for a brand-new profile. */
  setCurrent(id, defaults = {}) {
    data.current = id;
    if (!data.profiles[id]) data.profiles[id] = newProfile(defaults);
    data.profiles[id].settings = { ...BASE_SETTINGS, ...defaults, ...data.profiles[id].settings };
    save();
  },
  /** Read another profile's data (for the grown-ups page). */
  profileData: (id) => data.profiles[id] || newProfile(),

  data: () => cur(),
  settings: () => cur().settings,
  setSetting(k, v) { cur().settings[k] = v; save(); },

  progress: (key) => cur().progress[key],

  recordRound(key, { stars, firstTry, total, missed }) {
    const prog = cur().progress;
    const p = prog[key] || { best: 0, plays: 0, firstTry: 0, total: 0, missed: [] };
    p.best = Math.max(p.best, stars);
    p.plays += 1;
    p.firstTry += firstTry;
    p.total += total;
    p.last = Date.now();
    p.missed = [...missed, ...(p.missed || [])].slice(0, 8);
    prog[key] = p;
    save();
  },

  totalStars: () => Object.values(cur().progress).reduce((s, p) => s + (p.best || 0), 0),

  hasSticker: (id) => cur().stickers.includes(id),
  addSticker(id) { if (!cur().stickers.includes(id)) { cur().stickers.push(id); save(); } },

  // Questions she missed, saved so the "Tricky ones" round can replay them.
  tricky: () => cur().tricky || [],
  addTricky(entry) {
    const p = cur();
    p.tricky = [entry, ...(p.tricky || []).filter((t) => t.id !== entry.id)].slice(0, 30);
    save();
  },
  removeTricky(id) {
    const p = cur();
    if (!p.tricky?.some((t) => t.id === id)) return;
    p.tricky = p.tricky.filter((t) => t.id !== id);
    save();
  },

  resetProfile(id) {
    const p = data.profiles[id];
    if (p) data.profiles[id] = { ...newProfile(), settings: p.settings };
    save();
  },
};
