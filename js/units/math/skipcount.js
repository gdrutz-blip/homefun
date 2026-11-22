// SKIP COUNTING & PATTERNS — Garage Band 🎸 (Mia & the Blue Sweaters, for Weezer fans)
import { rand, pick, shuffle, sample, numberChoices } from '../../util.js';
import { sequence } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;

const PLAYERS = () => [
  { who: M, does: L('strums her guitar', 'gratte sa guitare') },
  { who: F, does: L('bangs the drums', 'joue de la batterie') },
  { who: G, does: L('shakes her shaker', 'secoue ses maracas') },
  { who: M, does: L('sings into the mic', 'chante au micro') },
];
const BADGES = () => L(
  ['🎸 Sound check!', '🥁 Drum solo!', '🎤 Encore!', '🎹 Band practice!', '🤘 Rock out!'],
  ['🎸 Test de son!', '🥁 Solo de batterie!', '🎤 Encore!', '🎹 Répétition!', '🤘 On rocke!'],
);

const NOTE_NAMES = {
  '🎸': ['guitar', 'guitare'], '🥁': ['drum', 'tambour'], '🎤': ['microphone', 'micro'], '🎹': ['keyboard', 'clavier'],
  '💙': ['blue heart', 'cœur bleu'], '🤘': ['rock hand', 'main rock'], '🕶️': ['glasses', 'lunettes'], '🎧': ['headphones', 'écouteurs'],
};
const noteName = (x) => L(...NOTE_NAMES[x]);
const NOTES = Object.keys(NOTE_NAMES);

// ----- number sequences -----
function seqQuestion({ start, step, len, blank, level, i }) {
  const items = Array.from({ length: len }, (_, k) => start + step * k);
  const answer = items[blank];
  const p = pick(PLAYERS());
  const back = step < 0;
  const by = Math.abs(step);
  const atEnd = blank === len - 1;
  const counts = L(`counts ${back ? 'back ' : ''}by ${by}s`, `compte ${back ? 'à rebours ' : ''}par bonds de ${by}`);
  const ask = atEnd ? L('What comes next?', 'Quel nombre vient ensuite?') : L('What number is missing?', 'Quel nombre manque?');
  const spokenSeq = items.map((v, k) => (k === blank ? L('blank', 'trou') : v)).join(', ');
  const sign = back ? '−' : '+';
  const mode = level === 'spicy' && i % 2 ? 'number' : 'choice';
  const q = {
    key: `seq-${start}-${step}-${blank}`,
    badge: pick(BADGES()),
    text: `${p.who} ${p.does} ${L('and', 'et')} ${counts}. ${ask}`,
    say: `${p.who} ${counts} : ${spokenSeq}. ${ask}`,
    visual: sequence(items.map(String), { blank, cls: 'picks' }),
    answer,
    hint: {
      text: L(`Each jump is ${sign}${by}. ${items[blank - 1]} ${sign} ${by} = ?`, `Chaque bond est ${sign}${by}. ${items[blank - 1]} ${sign} ${by} = ?`),
      say: L(`Each jump is ${back ? 'minus' : 'plus'} ${by}. What is ${items[blank - 1]} ${back ? 'minus' : 'plus'} ${by}?`,
        `Chaque bond est ${back ? 'moins' : 'plus'} ${by}. Combien font ${items[blank - 1]} ${back ? 'moins' : 'plus'} ${by}?`),
      visual: sequence(items.map(String), { blank, jumps: `${sign}${by}`, cls: 'picks' }),
    },
    plain: `${counts}: ${items.map((v, k) => (k === blank ? '?' : v)).join(', ')}`,
  };
  if (mode === 'number') return { ...q, type: 'number' };
  return {
    ...q, type: 'choice', choiceStyle: 'num',
    choices: numberChoices(answer, { min: 0, max: 250, near: [by, -by, 1, -1, 10, -10] }).map((v) => ({ label: String(v), value: v })),
  };
}

// ----- emoji patterns -----
const CORES = { AB: [0, 1], AAB: [0, 0, 1], ABB: [0, 1, 1], ABC: [0, 1, 2], AABB: [0, 0, 1, 1] };

function patternQuestion(coreName) {
  const core = CORES[coreName];
  const icons = sample(NOTES, 3);
  const unit = core.map((k) => icons[k]);
  const total = unit.length * 2 + rand(1, unit.length);
  const items = Array.from({ length: total }, (_, k) => unit[k % unit.length]);
  const answer = unit[total % unit.length];
  const used = [...new Set(unit)];
  const options = [...used, ...sample(NOTES.filter((x) => !used.includes(x)), 3 - used.length)];
  const ask = L('The band plays a pattern. What comes next?', 'Le groupe joue une suite. Qu’est-ce qui vient ensuite?');
  return {
    key: `pat-${items.join('')}`,
    badge: L('🎶 Beat pattern!', '🎶 Suite musicale!'),
    text: ask,
    say: `${L('The band plays a pattern', 'Le groupe joue une suite')} : ${items.map(noteName).join(', ')}. ${L('What comes next?', 'Qu’est-ce qui vient ensuite?')}`,
    visual: sequence([...items, '?'], { blank: items.length, cls: 'emoji-seq' }),
    type: 'choice',
    choiceStyle: 'emoji',
    choices: shuffle(options).map((x) => ({ label: x, value: x, say: noteName(x) })),
    sayChoices: true,
    answer,
    revealSay: noteName(answer),
    hint: {
      text: L(`Find the part that repeats: ${unit.join(' ')}. Say it out loud!`, `Trouve le motif qui se répète : ${unit.join(' ')}. Dis-le à voix haute!`),
      say: L(`Find the part that repeats: ${unit.map(noteName).join(', ')}. Say it out loud!`, `Trouve le motif qui se répète : ${unit.map(noteName).join(', ')}. Dis-le à voix haute!`),
    },
    plain: `Pattern: ${items.join(' ')} ?`,
  };
}

// ----- "count by what?" -----
function byWhatQuestion(steps) {
  const by = pick(steps);
  const start = by * rand(1, 8);
  const items = Array.from({ length: 4 }, (_, k) => start + by * k);
  const p = pick(PLAYERS());
  const options = sample(steps, Math.min(4, steps.length), by).sort((a, b) => a - b);
  const label = (v) => L(`by ${v}s`, `par bonds de ${v}`);
  const text = L(`${p.who} counts: ${items.join(', ')}. What is she counting by?`, `${p.who} compte : ${items.join(', ')}. Elle compte par bonds de combien?`);
  return {
    key: `by-${start}-${by}`,
    badge: pick(BADGES()),
    text,
    say: text,
    visual: sequence(items.map(String), { cls: 'picks' }),
    type: 'choice',
    choiceStyle: 'word',
    sayChoices: true,
    choices: options.map((v) => ({ label: label(v), value: v, say: label(v) })),
    answer: by,
    revealSay: label(by),
    hint: { text: L(`How far is it from ${items[0]} to ${items[1]}?`, `Combien y a-t-il de ${items[0]} à ${items[1]}?`) },
    plain: `Counting by? ${items.join(', ')}`,
  };
}

function mild(i) {
  const k = pick(['seq', 'seq', 'seq', 'pattern']);
  if (k === 'pattern') return patternQuestion(pick(['AB', 'AB', 'AAB', 'ABB']));
  const step = pick([2, 5, 10]);
  const len = 5;
  const max = step === 10 ? 100 : step === 5 ? 50 : 20;
  const start = step * rand(0, max / step - len);
  return seqQuestion({ start, step, len, blank: len - 1, level: 'mild', i });
}

function medium(i) {
  const k = pick(['seq', 'seq', 'seq', 'pattern', 'bywhat']);
  if (k === 'pattern') return patternQuestion(pick(['ABC', 'AAB', 'ABB', 'AABB']));
  if (k === 'bywhat') return byWhatQuestion([2, 5, 10]);
  const step = pick([2, 5, 10]);
  const len = 5;
  const start = step * rand(1, Math.floor(100 / step) - len);
  return seqQuestion({ start, step, len, blank: rand(1, len - 1), level: 'medium', i });
}

function spicy(i) {
  const k = pick(['back', 'big', 'offset', 'offset', 'bywhat']);
  const len = 5;
  if (k === 'bywhat') return byWhatQuestion([2, 5, 10, 20, 25]);
  if (k === 'back') {
    const by = pick([2, 5, 10]);
    const start = by * rand(len + 1, Math.floor(200 / by));
    return seqQuestion({ start, step: -by, len, blank: rand(1, len - 1), level: 'spicy', i });
  }
  if (k === 'big') {
    const by = pick([20, 25]);
    const start = by * rand(0, Math.floor(200 / by) - len);
    return seqQuestion({ start, step: by, len, blank: rand(1, len - 1), level: 'spicy', i });
  }
  // start somewhere that isn't a multiple: 13, 23, 33...
  const by = pick([2, 5, 10]);
  const start = by === 2 ? rand(51, 180) | 1 : by * rand(2, Math.floor(180 / by) - len) + rand(1, by - 1);
  return seqQuestion({ start, step: by, len, blank: rand(1, len - 1), level: 'spicy', i });
}

export default {
  id: 'skipcount',
  emoji: '🎸',
  theme: 'band',
  color: '#2f6fed',
  sound: 'band',
  get title() { return L('Garage Band', 'Le groupe rock'); },
  get skill() { return L('Skip counting & patterns', 'Compter par bonds et suites'); },
  get blurb() { return L('Rock out with Mia & the Blue Sweaters — a band for Weezer fans!', 'Joue avec Mia & the Blue Sweaters — un groupe pour les fans de Weezer!'); },
  get intro() {
    return L(`Welcome to band practice! ${M} and the Blue Sweaters are warming up in the garage. Count along to the beat!`,
      `C'est la répétition! ${M} et les Blue Sweaters se réchauffent dans le garage. Compte au rythme de la musique!`);
  },
  get levels() {
    return {
      mild: { kid: L('Count by 2s, 5s and 10s', 'Compte par bonds de 2, 5 et 10'), parent: 'Skip counting forward by 2s (to 20), 5s (to 50), 10s (to 100) from a multiple; AB / AAB repeating patterns.' },
      medium: { kid: L('Find missing numbers and patterns', 'Trouve les nombres manquants et les suites'), parent: 'Skip counting by 2, 5, 10 to 100 with missing middle terms; ABC/AABB patterns; identifying the skip.' },
      spicy: { kid: L('Count backwards, by 20s and 25s, up to 200', "Compte à rebours, par 20 et par 25, jusqu'à 200"), parent: 'Counting back by 2, 5, 10; by 20s and 25s; counting on from non-multiples (e.g., 13, 23, 33); numbers to 200.' },
    };
  },
  get praise() { return L(['Rock on! 🤘', 'Encore! 🎸', "That's a hit! 🎶", 'Turn it up! 🔊'], ['Ça rocke! 🤘', 'Encore! 🎸', "C'est un succès! 🎶", 'Plus fort! 🔊']); },
  get doneTitles() { return L(['Great show! 🎸', 'The crowd goes wild! 🤘', 'Garage Band rocks! 🥁'], ['Super spectacle! 🎸', 'La foule est en délire! 🤘', 'Le groupe rock assure! 🥁']); },
  makeQuestion(level, i) {
    return level === 'spicy' ? spicy(i) : level === 'medium' ? medium(i) : mild(i);
  },
};
