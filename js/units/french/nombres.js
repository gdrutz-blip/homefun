// FRANÇAIS — Numbers: Le café des crêpes 🥞 (always in French)
import { rand, pick, numberChoices, shuffle } from '../../util.js';
import { numberQ, wordQ } from '../common.js';
import { emojiGroup } from '../../visuals.js';
import { FAMILY } from '../../config.js';

const { kid: M, bigSister: F } = FAMILY;

const UNITS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
  'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
const TENS = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };

/** French number words 0–100 (traditional spelling, as taught in Ontario schools). */
export function frNumber(n) {
  if (n < 20) return UNITS[n];
  if (n === 100) return 'cent';
  if (n < 70) {
    const t = Math.floor(n / 10), u = n % 10;
    if (u === 0) return TENS[t];
    if (u === 1) return `${TENS[t]} et un`;
    return `${TENS[t]}-${UNITS[u]}`;
  }
  if (n < 80) return n === 71 ? 'soixante et onze' : `soixante-${UNITS[n - 60]}`;
  if (n === 80) return 'quatre-vingts';
  return `quatre-vingt-${UNITS[n - 80]}`;
}

const RANGE = { mild: [0, 20], medium: [20, 69], spicy: [60, 100] };
const ITEMS = [['🥞', 'crêpes'], ['🍓', 'fraises'], ['🍌', 'bananes'], ['🫐', 'bleuets'], ['🍫', 'carrés de chocolat']];
const BADGES = ['🥞 Au café!', '🍫 Crêpe au chocolat!', '🍓 Commande spéciale!'];
const base = { lang: 'fr-CA' };

// Numbers that sound alike in French: make the wrong answers tricky in a useful way.
function nearFr(n) {
  return [1, -1, 10, -10, 20, -20, n < 20 ? 10 : 2];
}

function listenQ(level, i) {
  const [lo, hi] = RANGE[level];
  const n = rand(lo, hi);
  const mode = level === 'spicy' && i % 2 ? 'number' : 'choice';
  return numberQ({
    ...base,
    key: `listen-${n}`, badge: pick(BADGES), listen: true,
    text: 'Écoute bien! 🔊 Quel nombre entends-tu?',
    visual: '<button class="speak huge" data-act="say-q" aria-label="Écoute encore">🔊</button>',
    say: `${frNumber(n)}. Quel nombre entends-tu? ${frNumber(n)}.`,
    answer: n, mode, min: 0, max: 100, near: nearFr(n),
    revealSay: frNumber(n),
    hint: { text: `Touche 🔊 pour l'entendre encore. Le nombre s'écrit : ${frNumber(n)}.`, say: `Écoute encore : ${frNumber(n)}.` },
    plain: `Écoute : ${frNumber(n)} (${n})`,
  });
}

function readWordQ(level, i) {
  const [lo, hi] = RANGE[level];
  const n = rand(lo, hi);
  const mode = level === 'spicy' && i % 2 ? 'number' : 'choice';
  return numberQ({
    ...base,
    key: `read-${n}`, badge: pick(BADGES),
    text: `Lis le mot. Quel nombre est-ce?`,
    big: `<span class="num-word">${frNumber(n)}</span>`,
    say: `Lis le mot. Quel nombre est-ce? ${frNumber(n)}.`,
    answer: n, mode, min: 0, max: 100, near: nearFr(n),
    revealSay: frNumber(n),
    hint: { text: n >= 70 ? 'Rappel : soixante-dix = 70, quatre-vingts = 80, quatre-vingt-dix = 90.' : 'Coupe le mot en morceaux : les dizaines, puis les unités.' },
  });
}

function digitToWordQ(level) {
  const [lo, hi] = RANGE[level];
  const n = rand(lo, hi);
  const wrongs = numberChoices(n, { min: 0, max: 100, near: nearFr(n), count: 3 }).filter((x) => x !== n).slice(0, 2);
  return wordQ({
    ...base,
    key: `d2w-${n}`, badge: pick(BADGES),
    text: 'Comment écrit-on ce nombre?',
    big: String(n),
    options: shuffle([n, ...wrongs]).map((x) => ({ value: x, label: frNumber(x) })),
    answer: n,
    hint: { text: n >= 70 ? 'Rappel : soixante-dix = 70, quatre-vingts = 80, quatre-vingt-dix = 90.' : 'Cherche d’abord le mot des dizaines.' },
  });
}

function countQ() {
  const [e, word] = pick(ITEMS);
  const n = rand(3, 15);
  return wordQ({
    ...base,
    key: `count-${n}-${e}`, badge: pick(BADGES),
    text: `${pick([M, F])} met des ${word} sur sa crêpe. Combien y en a-t-il?`,
    visual: emojiGroup(e, n),
    options: shuffle([n, ...numberChoices(n, { min: 1, max: 20, near: [1, -1, 2], count: 3 }).filter((x) => x !== n).slice(0, 2)])
      .map((x) => ({ value: x, label: frNumber(x) })),
    answer: n,
    hint: { text: 'Compte-les un par un, à voix haute en français!' },
  });
}

export default {
  id: 'nombres',
  emoji: '🥞',
  theme: 'crepe',
  color: '#a0522d',
  forceLang: 'fr',
  title: 'Le café des crêpes',
  skill: 'Les nombres',
  blurb: 'Écoute, lis et écris les nombres jusqu’à 100!',
  intro: `Bienvenue au café des crêpes de ${M}! Les clients commandent des crêpes au chocolat-noisette. Écoute bien les nombres!`,
  levels: {
    mild: { kid: 'Les nombres de 0 à 20', parent: 'Hear/read French numbers 0–20 and tap the digits; count objects and pick the French word.' },
    medium: { kid: 'Les nombres de 20 à 69', parent: 'Hear/read French numbers 20–69 (vingt et un, trente-quatre…); match digits to words.' },
    spicy: { kid: 'Les grands nombres jusqu’à 100', parent: 'French numbers 60–100 (soixante-dix, quatre-vingts, quatre-vingt-dix); half typed on keypad.' },
  },
  praise: ['Délicieux! 🥞', 'Miam! 🍫', 'Bravo, chef! 👩‍🍳', 'Ooh là là! 🥞'],
  doneTitles: ['Le café est fermé! 🥞', 'Super cheffe! 👩‍🍳', 'Toutes les crêpes sont servies! 🍫'],
  makeQuestion(level, i) {
    if (level === 'mild') return pick([() => listenQ('mild', i), () => listenQ('mild', i), () => readWordQ('mild', i), countQ])();
    return pick([() => listenQ(level, i), () => listenQ(level, i), () => readWordQ(level, i), () => digitToWordQ(level)])();
  },
};
