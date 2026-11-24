// Progress lives in this browser only (localStorage). Nothing is sent anywhere.
// Each kid has her own profile: settings, progress and stickers.
const KEY = 'familyReview.v2';
const BACKUP_PREFIX = 'FAMILYREVIEW1:';
const OLD_KEY = 'miaReview.v1'; // before profiles existed: everything belonged to Mia

const BASE_SETTINGS = { autoRead: true, sound: true, slow: false, lang: 'en', tapWords: true, followAlong: true, bigText: false };
const newProfile = (settings = {}) => ({ settings: { ...BASE_SETTINGS, ...settings }, progress: {}, stickers: [], tricky: [], avatar: null, stats: {} });

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
  /** Run `fn(settings)` once per profile (keyed by `key`) — used for one-time default changes. */
  migrateOnce(id, key, fn) {
    const p = data.profiles[id];
    if (!p || p.settings['_m_' + key]) return;
    fn(p.settings);
    p.settings['_m_' + key] = true;
    save();
  },
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
    const st = (cur().stats = cur().stats || {});
    st.rounds = (st.rounds || 0) + 1;
    if (firstTry === total && total >= 5) st.perfect = (st.perfect || 0) + 1;
    save();
  },

  // Small counters for trophies (rounds, perfect rounds, tricky questions beaten…).
  stats: () => cur().stats || {},
  bump(name, n = 1) { const st = (cur().stats = cur().stats || {}); st[name] = (st[name] || 0) + n; save(); },

  // Dress-up avatar choices (buddy, hat, extra, background).
  avatar: () => cur().avatar,
  setAvatar(patch) { cur().avatar = { ...(cur().avatar || {}), ...patch }; save(); },

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
    p.stats = p.stats || {};
    p.stats.trickyCleared = (p.stats.trickyCleared || 0) + 1;
    save();
  },

  /** A text code with everything (both kids) so progress can move to another phone. */
  exportCode() {
    // Tricky questions are left out: they are big and rebuild themselves as she plays.
    const slim = Object.fromEntries(Object.entries(data.profiles).map(([id, p]) => [id, { ...p, tricky: [] }]));
    const bytes = new TextEncoder().encode(JSON.stringify({ v: 2, current: data.current, profiles: slim }));
    let bin = '';
    bytes.forEach((b) => { bin += String.fromCharCode(b); });
    return BACKUP_PREFIX + btoa(bin);
  },
  /** Restore from a code made by exportCode(). Returns true on success. */
  importCode(code) {
    try {
      const text = String(code).trim().replace(/\s+/g, '');
      if (!text.startsWith(BACKUP_PREFIX)) return false;
      const bin = atob(text.slice(BACKUP_PREFIX.length));
      const parsed = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
      if (!parsed || typeof parsed.profiles !== 'object') return false;
      const profiles = {};
      for (const [id, p] of Object.entries(parsed.profiles)) {
        const fresh = newProfile();
        profiles[id] = { ...fresh, ...p, settings: { ...fresh.settings, ...(p.settings || {}) },
          progress: p.progress || {}, stickers: p.stickers || [], tricky: p.tricky || [], stats: p.stats || {} };
      }
      data = { current: null, profiles };
      save();
      return true;
    } catch { return false; }
  },

  resetProfile(id) {
    const p = data.profiles[id];
    if (p) data.profiles[id] = { ...newProfile(), settings: p.settings };
    save();
  },
};
