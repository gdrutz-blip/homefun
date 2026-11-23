// Special rounds that mix games together:
//  🎲 Surprise me! — questions from all her games, each at the level she's ready for.
//  🧠 Tricky ones — replays questions she got wrong before, until she gets them right.
import { currentProfile } from './profiles.js';
import { store } from './storage.js';
import { forceLang, L, voiceLang } from './i18n.js';
import { pick, shuffle } from './util.js';

const ORDER = ['mild', 'medium', 'spicy'];

/** The level she's ready for: one step above the highest level where she earned 2+ stars. */
function readyLevel(subjectId, unitId) {
  let lv = 'mild';
  ORDER.forEach((l, i) => {
    if ((store.progress(`${subjectId}.${unitId}.${l}`)?.best || 0) >= 2) lv = ORDER[Math.min(i + 1, 2)];
  });
  return lv;
}

const games = () => currentProfile().subjects.filter((s) => !s.comingSoon)
  .flatMap((s) => s.units.map((u) => ({ s, u })));

export function surpriseUnit() {
  const all = games();
  return {
    id: 'surprise',
    emoji: '🎲',
    get praise() { return L(['Surprise! 🎉', 'Mix master! 🎲'], ['Surprise! 🎉', 'Championne du mélange! 🎲']); },
    get doneTitles() { return L(['Surprise round done! 🎲', 'You can do it all! 🌟'], ['Partie surprise terminée! 🎲', 'Tu sais tout faire! 🌟']); },
    makeQuestion(_level, i) {
      const { s, u } = pick(all);
      const lv = readyLevel(s.id, u.id);
      forceLang(s.forceLang || null); // Français questions stay in French
      const q = u.makeQuestion(lv, i);
      const lang = q.lang || voiceLang();
      forceLang(null);
      return { ...q, lang, badge: `${u.emoji} ${u.title}`, _subject: s.id, _unit: u.id, _level: lv };
    },
  };
}

export function trickyUnit() {
  const entries = shuffle(store.tricky()).slice(0, 8);
  return {
    id: 'tricky',
    emoji: '🧠',
    count: entries.length,
    get praise() { return L(['You got it this time! 💪', 'Not tricky anymore! 🧠'], ['Cette fois, c’est réussi! 💪', 'Plus du tout difficile! 🧠']); },
    get doneTitles() { return L(['Brain power! 🧠', 'Tricky ones tamed! 💪'], ['Quel cerveau! 🧠', 'Tu as dompté les pièges! 💪']); },
    makeQuestion(_level, i) {
      const e = entries[i % entries.length];
      const q = { ...e.q, _subject: e.subjectId, _unit: e.unitId, _level: e.levelId };
      if (q.choices) q.choices = shuffle(q.choices);
      return q;
    },
  };
}
