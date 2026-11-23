// Rewards beyond stickers: a dress-up closet (buddy, hat, extra, background) unlocked with stars,
// and a trophy shelf (milestones + a "triple crown" for every game).
import { store } from './storage.js';
import { currentProfile } from './profiles.js';
import { LEVELS } from './levels.js';

// ---------------- dress-up closet ----------------
export const BUDDIES = [
  { id: 'dog', e: '🐶', cost: 0 }, { id: 'cat', e: '🐱', cost: 0 }, { id: 'unicorn', e: '🦄', cost: 0 },
  { id: 'bunny', e: '🐰', cost: 4 }, { id: 'fox', e: '🦊', cost: 8 }, { id: 'bear', e: '🐻', cost: 12 },
  { id: 'panda', e: '🐼', cost: 18 }, { id: 'frog', e: '🐸', cost: 24 }, { id: 'owl', e: '🦉', cost: 30 },
  { id: 'octopus', e: '🐙', cost: 40 }, { id: 'butterfly', e: '🦋', cost: 50 }, { id: 'dragon', e: '🐲', cost: 65 },
  { id: 'trex', e: '🦖', cost: 80 }, { id: 'lion', e: '🦁', cost: 100 },
];
export const HATS = [
  { id: 'none', e: '', name: 'No hat', cost: 0 }, { id: 'cap', e: '🧢', cost: 3 }, { id: 'bow', e: '🎀', cost: 6 },
  { id: 'straw', e: '👒', cost: 10 }, { id: 'top', e: '🎩', cost: 15 }, { id: 'helmet', e: '⛑️', cost: 20 },
  { id: 'crown', e: '👑', cost: 30 }, { id: 'grad', e: '🎓', cost: 45 },
];
export const EXTRAS = [
  { id: 'none', e: '', name: 'Nothing', cost: 0 }, { id: 'ice', e: '🍦', cost: 5 }, { id: 'guitar', e: '🎸', cost: 8 },
  { id: 'choc', e: '🍫', cost: 9 }, { id: 'mic', e: '🎤', cost: 12 }, { id: 'pizza', e: '🍕', cost: 14 },
  { id: 'worm', e: '🪱', cost: 16 }, { id: 'wand', e: '🪄', cost: 18 }, { id: 'bike', e: '🚲', cost: 22 },
  { id: 'drum', e: '🥁', cost: 25 }, { id: 'soccer', e: '⚽', cost: 28 }, { id: 'teddy', e: '🧸', cost: 32 },
  { id: 'coaster', e: '🎢', cost: 38 }, { id: 'medal', e: '🥇', cost: 45 }, { id: 'trophy', e: '🏆', cost: 60 },
];
export const BGS = [
  { id: 'sunny', css: 'linear-gradient(135deg,#ffe29a,#ffa99f)', cost: 0 },
  { id: 'candy', css: 'linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb)', cost: 4 },
  { id: 'ocean', css: 'linear-gradient(135deg,#84fab0,#8fd3f4)', cost: 8 },
  { id: 'forest', css: 'linear-gradient(135deg,#d4fc79,#96e6a1)', cost: 12 },
  { id: 'night', css: 'linear-gradient(135deg,#4b6cb7,#182848)', cost: 20 },
  { id: 'sunset', css: 'linear-gradient(135deg,#f6d365,#fda085,#c471ed)', cost: 28 },
  { id: 'rainbow', css: 'linear-gradient(135deg,#ff9a9e,#fecf6b,#a1ffce,#8fd3f4,#c3a5ff)', cost: 40 },
  { id: 'galaxy', css: 'linear-gradient(135deg,#0f0c29,#302b63,#6a3093)', cost: 55 },
];
export const SLOTS = {
  buddy: { label: 'Buddy', list: BUDDIES },
  hat: { label: 'Hat', list: HATS },
  extra: { label: 'Extra', list: EXTRAS },
  bg: { label: 'Background', list: BGS },
};

const DEFAULTS = {
  mia: { buddy: 'unicorn', hat: 'none', extra: 'none', bg: 'sunny' },
  farrah: { buddy: 'dog', hat: 'none', extra: 'none', bg: 'ocean' },
};
const byId = (list, id) => list.find((x) => x.id === id) || list[0];

export function avatarOf(profileId) {
  const d = DEFAULTS[profileId] || DEFAULTS.mia;
  const saved = store.profileData(profileId).avatar || {};
  const av = { ...d, ...saved };
  // If a saved item isn't unlocked (e.g. after a reset), fall back to the default.
  const stars = starsOf(profileId);
  for (const k of Object.keys(SLOTS)) if (byId(SLOTS[k].list, av[k]).cost > stars) av[k] = d[k];
  return av;
}

function starsOf(profileId) {
  return Object.values(store.profileData(profileId).progress).reduce((s, p) => s + (p.best || 0), 0);
}

export function avatarHTML(av, size = 96) {
  const b = byId(BUDDIES, av.buddy), h = byId(HATS, av.hat), x = byId(EXTRAS, av.extra), g = byId(BGS, av.bg);
  return `<span class="avatar" style="--s:${size}px;background:${g.css}" aria-hidden="true">
    <span class="av-buddy">${b.e}</span>${h.e ? `<span class="av-hat">${h.e}</span>` : ''}${x.e ? `<span class="av-extra">${x.e}</span>` : ''}</span>`;
}

/** Closet items that unlock when stars go from `before` to `after`. */
export function newlyUnlocked(before, after) {
  const out = [];
  for (const [slot, { list }] of Object.entries(SLOTS)) {
    for (const it of list) if (it.cost > before && it.cost <= after) out.push({ ...it, slot });
  }
  return out;
}

export function itemPreview(slot, it) {
  if (slot === 'bg') return `<span class="swatch" style="background:${it.css}"></span>`;
  return it.e || '🚫';
}

// ---------------- trophies ----------------
const sum = (d, pred) => Object.entries(d.progress).reduce((s, [k, p]) => s + (pred(k, p) || 0), 0);

export function computeTrophies(profile = currentProfile()) {
  const d = store.data();
  const stars = store.totalStars();
  const st = store.stats();
  const rounds = sum(d, (_, p) => p.plays);
  const subjects = profile.subjects.filter((s) => !s.comingSoon);
  const list = [];
  const add = (id, e, name, how, earned, cat = 'milestone') => list.push({ id, e, name, how, earned: !!earned, cat });

  add('first', '🌟', 'First Round', 'Finish your first round', rounds >= 1);
  add('r10', '🎯', '10 Rounds', 'Finish 10 rounds', rounds >= 10);
  add('r25', '🚀', '25 Rounds', 'Finish 25 rounds', rounds >= 25);
  add('r50', '🏅', '50 Rounds', 'Finish 50 rounds', rounds >= 50);
  add('r100', '🥇', '100 Rounds', 'Finish 100 rounds', rounds >= 100);
  add('s25', '⭐', '25 Stars', 'Collect 25 stars', stars >= 25);
  add('s50', '✨', '50 Stars', 'Collect 50 stars', stars >= 50);
  add('s100', '💫', '100 Stars', 'Collect 100 stars', stars >= 100);
  add('s200', '🌠', '200 Stars', 'Collect 200 stars', stars >= 200);
  add('perfect', '💯', 'Perfect Round', 'Get every question right on the first try', (st.perfect || 0) >= 1);
  add('perfect5', '🎖️', '5 Perfect Rounds', 'Get 5 perfect rounds', (st.perfect || 0) >= 5);
  add('spicy', '🌶️', 'Spicy Hero', 'Get 3 stars on a Spicy level', Object.entries(d.progress).some(([k, p]) => k.endsWith('.spicy') && p.best === 3));
  add('explorer', '🧭', 'Explorer', 'Play a game in every subject', subjects.every((s) => s.units.some((u) => LEVELS.some((l) => (d.progress[`${s.id}.${u.id}.${l.id}`]?.plays || 0) > 0))));
  const frPlays = subjects.flatMap((s) => s.units.filter((u) => u.forceLang === 'fr' || s.forceLang === 'fr').flatMap((u) => LEVELS.map((l) => d.progress[`${s.id}.${u.id}.${l.id}`]?.plays || 0))).reduce((a, b) => a + b, 0);
  add('french', '🥐', 'Français Fan', 'Finish 5 rounds of Français games', frPlays >= 5);
  add('tricky', '🧠', 'Tricky Tamer', 'Beat 10 tricky questions', (st.trickyCleared || 0) >= 10);
  add('surprise', '🎲', 'Surprise!', 'Finish a Surprise me round', (st.surprise || 0) >= 1);
  add('stk25', '📒', 'Sticker Collector', 'Collect 25 stickers', d.stickers.length >= 25);
  add('stkall', '🏵️', 'Sticker Champion', 'Collect every sticker', d.stickers.length >= profile.stickers.length);

  for (const s of subjects) {
    for (const u of s.units) {
      const crown = LEVELS.every((l) => d.progress[`${s.id}.${u.id}.${l.id}`]?.best === 3);
      add(`crown-${s.id}-${u.id}`, u.emoji, u.title, 'Get 3 stars on Mild, Medium and Spicy', crown, 'game');
    }
  }
  return list;
}
