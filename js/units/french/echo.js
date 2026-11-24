// FRANÇAIS — say-it games: listen to a French word or sentence, then say it back.
// With the microphone turned on (Settings, grown-up approval) the phone listens; otherwise it's the honor system.
import { pick } from '../../util.js';
import { card } from '../../visuals.js';

const base = { lang: 'fr-CA' };
const BADGES = ['🎤 Écho!', '🗣️ Répète!', '🎶 Chante-le!', '⭐ Bien dit!'];

function makeQuestion(unitId, bank, level) {
  const item = pick(bank[level]);
  const target = item.t;
  return {
    ...base,
    type: 'speak',
    listen: true, // read the phrase aloud right away, even when automatic reading is off
    key: `echo-${unitId}-${target}`,
    badge: pick(BADGES),
    text: `Écoute et répète : <b>${target}</b>`,
    say: target,
    visual: card(`<span class="big-emoji">${item.e}</span>`),
    target,
    accept: item.accept || [],
    answer: target,
    hint: { text: 'Écoute bien, puis dis-le doucement, un mot à la fois. Touche 🔊 pour l’entendre encore.', say: target },
    plain: target,
  };
}

export function makeEchoUnit({ id, emoji, theme, color, title, skill, blurb, intro, levels, bank }) {
  return {
    id, emoji, theme, color, forceLang: 'fr', title, skill, blurb, intro, levels,
    praise: ['Bien dit! 🎤', 'Parfait! 🌟', 'Quelle belle voix! 🗣️', 'Bravo! 🎶'],
    doneTitles: ['Quel spectacle! 🎤', 'Tu parles bien! 🗣️', 'Bravo, la vedette! 🌟'],
    makeQuestion(level) { return makeQuestion(id, bank, level); },
  };
}

