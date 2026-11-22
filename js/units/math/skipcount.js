// SKIP COUNTING & PATTERNS — Garage Band 🎸 (Mia & the Blue Sweaters, for Weezer fans)
import { rand, pick, shuffle, sample, numberChoices } from '../../util.js';
import { sequence } from '../../visuals.js';
import { FAMILY } from '../../config.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;

const PLAYERS = [
  { who: M, does: 'strums her guitar', e: '🎸' },
  { who: F, does: 'bangs the drums', e: '🥁' },
  { who: G, does: 'shakes her shaker', e: '🪇' },
  { who: M, does: 'sings into the mic', e: '🎤' },
];
const BADGES = ['🎸 Sound check!', '🥁 Drum solo!', '🎤 Encore!', '🎹 Band practice!', '🤘 Rock out!'];

const NOTE_NAMES = { '🎸': 'guitar', '🥁': 'drum', '🎤': 'microphone', '🎹': 'keyboard', '💙': 'blue heart', '🤘': 'rock hand', '🕶️': 'glasses', '🎧': 'headphones' };
const NOTES = Object.keys(NOTE_NAMES);

// ----- number sequences -----
function seqQuestion({ start, step, len, blank, level, i }) {
  const items = Array.from({ length: len }, (_, k) => start + step * k);
  const answer = items[blank];
  const p = pick(PLAYERS);
  const back = step < 0;
  const by = Math.abs(step);
  const atEnd = blank === len - 1;
  const text = `${p.who} ${p.does} and counts ${back ? 'back ' : ''}by ${by}s. ${atEnd ? 'What comes next?' : 'What number is missing?'}`;
  const spokenSeq = items.map((v, k) => (k === blank ? 'blank' : v)).join(', ');
  const mode = level === 'spicy' && i % 2 ? 'number' : 'choice';
  const q = {
    key: `seq-${start}-${step}-${blank}`,
    badge: pick(BADGES),
    text,
    say: `${p.who} counts ${back ? 'back ' : ''}by ${by}s: ${spokenSeq}. ${atEnd ? 'What comes next?' : 'What number goes in the blank?'}`,
    visual: sequence(items.map(String), { blank, cls: 'picks' }),
    answer,
    hint: {
      text: `Each jump is ${back ? '−' : '+'}${by}. ${items[blank - 1]} ${back ? '−' : '+'} ${by} = ?`,
      say: `Each jump is ${back ? 'minus' : 'plus'} ${by}. What is ${items[blank - 1]} ${back ? 'minus' : 'plus'} ${by}?`,
      visual: sequence(items.map(String), { blank, jumps: `${back ? '−' : '+'}${by}`, cls: 'picks' }),
    },
    plain: `Count ${back ? 'back ' : ''}by ${by}s: ${items.map((v, k) => (k === blank ? '?' : v)).join(', ')}`,
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
  const names = items.map((x) => NOTE_NAMES[x]).join(', ');
  return {
    key: `pat-${items.join('')}`,
    badge: '🎶 Beat pattern!',
    text: 'The band plays a pattern. What comes next?',
    say: `The band plays a pattern: ${names}. What comes next?`,
    visual: sequence([...items, '?'], { blank: items.length, cls: 'emoji-seq' }),
    type: 'choice',
    choiceStyle: 'emoji',
    choices: shuffle(options).map((x) => ({ label: x, value: x, say: NOTE_NAMES[x] })),
    sayChoices: true,
    answer,
    revealSay: `the ${NOTE_NAMES[answer]}`,
    hint: {
      text: `Find the part that repeats: ${unit.join(' ')}. Say it out loud!`,
      say: `Find the part that repeats: ${unit.map((x) => NOTE_NAMES[x]).join(', ')}. Say it out loud!`,
    },
    plain: `Pattern: ${items.join(' ')} ?`,
  };
}

// ----- "count by what?" -----
function byWhatQuestion(steps) {
  const by = pick(steps);
  const start = by * rand(1, 8);
  const items = Array.from({ length: 4 }, (_, k) => start + by * k);
  const p = pick(PLAYERS);
  const options = sample(steps, Math.min(4, steps.length), by).sort((a, b) => a - b);
  return {
    key: `by-${start}-${by}`,
    badge: pick(BADGES),
    text: `${p.who} counts: ${items.join(', ')}. What is she counting by?`,
    say: `${p.who} counts: ${items.join(', ')}. What is she counting by?`,
    visual: sequence(items.map(String), { cls: 'picks' }),
    type: 'choice',
    choiceStyle: 'word',
    sayChoices: true,
    choices: options.map((v) => ({ label: `by ${v}s`, value: v, say: `by ${v}s` })),
    answer: by,
    revealSay: `by ${by}s`,
    hint: { text: `How far is it from ${items[0]} to ${items[1]}?` },
    plain: `Counting by what? ${items.join(', ')}`,
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
  title: 'Garage Band',
  skill: 'Skip counting & patterns',
  emoji: '🎸',
  theme: 'band',
  color: '#2f6fed',
  sound: 'band',
  blurb: 'Rock out with Mia & the Blue Sweaters — a band for Weezer fans!',
  intro: `Welcome to band practice! ${M} and the Blue Sweaters are warming up in the garage. Count along to the beat!`,
  levels: {
    mild: { kid: 'Count by 2s, 5s and 10s', parent: 'Skip counting forward by 2s (to 20), 5s (to 50), 10s (to 100) from a multiple; AB / AAB repeating patterns.' },
    medium: { kid: 'Find missing numbers and patterns', parent: 'Skip counting by 2, 5, 10 to 100 with missing middle terms; ABC/AABB patterns; identifying the skip.' },
    spicy: { kid: 'Count backwards, by 20s and 25s, up to 200', parent: 'Counting back by 2, 5, 10; by 20s and 25s; counting on from non-multiples (e.g., 13, 23, 33); numbers to 200.' },
  },
  praise: ['Rock on! 🤘', 'Encore! 🎸', "That's a hit! 🎶", 'Turn it up! 🔊'],
  doneTitles: ['Great show! 🎸', 'The crowd goes wild! 🤘', 'Garage Band rocks! 🥁'],
  makeQuestion(level, i) {
    return level === 'spicy' ? spicy(i) : level === 'medium' ? medium(i) : mild(i);
  },
};

