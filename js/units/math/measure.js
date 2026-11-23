// GRADE 2 — MEASUREMENT: Gym Meet Measuring 📏 / On mesure au gymnase
import { rand, pick, sample, shuffle } from '../../util.js';
import { numberQ, wordQ, factQ } from '../common.js';
import { ruler, twoBars } from '../../visuals-measure.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F, baby: G } = FAMILY;
const BADGES = () => L(['📏 Measure it!', '🎀 Ribbon length!', '🤸‍♀️ Gym meet!', '✏️ Tiny or tall?'], ['📏 On mesure!', '🎀 Longueur du ruban!', '🤸‍♀️ Au gymnase!', '✏️ Petit ou grand?']);
const OBJECTS = () => [
  { e: '🎀', n: L('ribbon', 'ruban'), du: 'du ruban' }, { e: '✏️', n: L('pencil', 'crayon'), du: 'du crayon' },
  { e: '🪱', n: L('gummy worm', 'jujube'), du: 'du jujube' }, { e: '🖍️', n: L('crayon', 'crayon de cire'), du: 'du crayon de cire' },
  { e: '🍫', n: L('chocolate bar', 'tablette de chocolat'), du: 'de la tablette de chocolat' }, { e: '🔩', n: L('screw', 'vis'), du: 'de la vis' },
];

function lengthQ(max, offset, mode) {
  const ob = pick(OBJECTS());
  const start = offset ? rand(1, 4) : 0;
  const len = rand(3, max - start - 1);
  const end = start + len;
  return numberQ({
    key: `len-${start}-${end}-${ob.e}`, badge: pick(BADGES()),
    text: L(`How long is the ${ob.n}? Count the centimetres (cm).`, `Quelle est la longueur ${ob.du}? Compte les centimètres (cm).`),
    visual: card(ruler(start, end, { max, e: ob.e })),
    answer: len, mode, max: max + 2, min: 1, near: [1, -1, 2, -2, start || 3],
    hint: {
      text: start
        ? L(`It does not start at 0! It starts at ${start} and ends at ${end}. Count the jumps: ${end} − ${start}.`, `Il ne commence pas à 0! Il commence à ${start} et finit à ${end}. Compte les bonds : ${end} − ${start}.`)
        : L(`Line up the end with 0. Read the number at the other end: ${len}.`, `Place un bout à 0. Lis le nombre à l’autre bout : ${len}.`),
    },
  });
}

const UNIT_ITEMS = () => [
  { e: '✏️', n: L('a pencil', 'un crayon'), u: 'cm' }, { e: '🚌', n: L('a school bus', 'un autobus scolaire'), u: 'm' },
  { e: '🤸‍♀️', n: L('the gym balance beam', 'la poutre du gymnase'), u: 'm' }, { e: '🪱', n: L('a gummy worm', 'un jujube en forme de ver'), u: 'cm' },
  { e: '🏊', n: L('a swimming pool', 'une piscine'), u: 'm' }, { e: '🛏️', n: L('a bed', 'un lit'), u: 'm' },
  { e: '🧴', n: L('a bottle of glue', 'une bouteille de colle'), u: 'cm' }, { e: '🚪', n: L('a door', 'une porte'), u: 'm' },
  { e: '🍪', n: L('a cookie', 'un biscuit'), u: 'cm' },
];
function unitQ() {
  const it = pick(UNIT_ITEMS());
  return wordQ({
    key: `unit-${it.e}`, badge: pick(BADGES()),
    text: L(`Which unit would you use to measure ${it.n}?`, `Quelle unité utiliserais-tu pour mesurer ${it.n}?`),
    visual: card(`<span class="big-emoji">${it.e}</span>`),
    options: [{ value: 'cm', label: L('centimetres (cm)', 'centimètres (cm)') }, { value: 'm', label: L('metres (m)', 'mètres (m)') }],
    answer: it.u,
    hint: { text: L('Centimetres are for small things. Metres are for big things (about one big step for a grown-up).', 'Les centimètres servent pour les petits objets. Les mètres servent pour les grands (environ un grand pas d’adulte).') },
  });
}

function compareQ() {
  const a = rand(4, 16);
  let b = rand(4, 16);
  while (b === a) b = rand(4, 16);
  return wordQ({
    key: `cmp-${a}-${b}`, badge: pick(BADGES()),
    text: L(`${M} cuts two ribbons for her gym routine. Which one is LONGER?`, `${M} coupe deux rubans pour sa routine de gym. Lequel est le plus LONG?`),
    visual: card(twoBars(a, b)),
    options: [{ value: 'A', label: L('Ribbon A', 'Le ruban A') }, { value: 'B', label: L('Ribbon B', 'Le ruban B') }],
    answer: a > b ? 'A' : 'B',
    hint: { text: L(`A is ${a} cm. B is ${b} cm. Which number is bigger?`, `A mesure ${a} cm. B mesure ${b} cm. Quel nombre est le plus grand?`) },
  });
}

function differenceQ(mode) {
  const a = rand(8, 18), b = rand(3, a - 2);
  return numberQ({
    key: `diff-${a}-${b}`, badge: pick(BADGES()),
    text: L(`${F}'s ribbon is ${a} cm long. ${G}'s ribbon is ${b} cm long. How many cm longer is ${F}'s ribbon?`,
      `Le ruban de ${F} mesure ${a} cm. Le ruban de ${G} mesure ${b} cm. De combien de cm le ruban de ${F} est-il plus long?`),
    big: `${a} − ${b} = <span class="qbox">?</span>`,
    answer: a - b, mode, min: 1, max: 20, near: [1, -1, 2, -2, 10],
    hint: { text: L(`Subtract: ${a} − ${b}. Or count up from ${b} to ${a}.`, `Soustrais : ${a} − ${b}. Ou compte de ${b} jusqu’à ${a}.`) },
  });
}

const EST = () => [
  { e: '✏️', t: L('About how long is a new pencil?', 'Environ combien mesure un crayon neuf?'), a: '15 cm', o: ['15 m', '1 cm'], h: L('A pencil is about as long as your hand and a bit more: 15 cm.', 'Un crayon mesure à peu près la longueur de ta main et un peu plus : 15 cm.') },
  { e: '🚪', t: L('About how tall is a door?', 'Environ quelle est la hauteur d’une porte?'), a: '2 m', o: ['2 cm', '20 cm'], h: L('A door is taller than a grown-up: about 2 metres.', 'Une porte est plus haute qu’un adulte : environ 2 mètres.') },
  { e: '📎', t: L('About how long is a paper clip?', 'Environ combien mesure un trombone?'), a: '3 cm', o: ['3 m', '30 cm'], h: L('A paper clip is very small, about 3 cm.', 'Un trombone est très petit, environ 3 cm.') },
  { e: '🚌', t: L('About how long is a school bus?', 'Environ quelle est la longueur d’un autobus scolaire?'), a: '12 m', o: ['12 cm', '2 cm'], h: L('A school bus is very long: about 12 metres.', 'Un autobus scolaire est très long : environ 12 mètres.') },
  { e: '🛏️', t: L('About how long is a bed for a grown-up?', 'Environ quelle est la longueur d’un lit d’adulte?'), a: '2 m', o: ['2 cm', '20 cm'], h: L('A bed is about 2 metres long.', 'Un lit mesure environ 2 mètres.') },
];
function estimateQ() {
  return factQ(pick(EST()), { badge: pick(BADGES()), prefix: 'est' });
}

export default {
  id: 'measure',
  emoji: '📏',
  theme: 'measure',
  color: '#00838f',
  get title() { return L('Gym Meet Measuring', 'On mesure au gymnase'); },
  get skill() { return L('Measuring length', 'Mesurer des longueurs'); },
  get blurb() { return L('Measure ribbons, pencils and gummy worms in centimetres!', 'Mesure des rubans, des crayons et des jujubes en centimètres!'); },
  get intro() {
    return L(`${M} is getting ready for the gym meet! She needs to measure ribbons and mats. Grab your ruler!`,
      `${M} se prépare pour la compétition de gym! Elle doit mesurer des rubans et des tapis. Prends ta règle!`);
  },
  get levels() {
    return {
      mild: { kid: L('Read the ruler', 'Lis la règle'), parent: 'Measuring objects in cm starting at 0 (up to 12 cm); choosing cm or m.' },
      medium: { kid: L('Compare and choose units', 'Comparer et choisir l’unité'), parent: 'Comparing lengths; centimetres vs. metres; estimating sizes of real objects.' },
      spicy: { kid: L('Start at any number; how much longer?', 'Commencer n’importe où; combien de plus?'), parent: 'Measuring when the object does not start at 0; finding the difference between two lengths; half typed on keypad.' },
    };
  },
  get praise() { return L(['Right on the mark! 📏', 'Perfect measure! 🎀', 'Gold medal! 🥇'], ['Pile au bon endroit! 📏', 'Mesure parfaite! 🎀', 'Médaille d’or! 🥇']); },
  get doneTitles() { return L(['Measured to perfection! 📏', 'Gym meet ready! 🤸‍♀️'], ['Mesuré à la perfection! 📏', 'Prête pour la compétition! 🤸‍♀️']); },
  makeQuestion(level, i) {
    const mode = i % 2 ? 'number' : 'choice';
    if (level === 'mild') return pick([() => lengthQ(10, false, 'choice'), () => lengthQ(12, false, 'choice'), unitQ])();
    if (level === 'medium') return pick([compareQ, unitQ, estimateQ, () => lengthQ(12, false, mode)])();
    return pick([() => lengthQ(15, true, mode), () => lengthQ(15, true, mode), () => differenceQ(mode), estimateQ])();
  },
};
