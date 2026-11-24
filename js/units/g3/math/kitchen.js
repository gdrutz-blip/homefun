// GRADE 3 — MASS & CAPACITY: Farrah's Breakfast Kitchen 🍳 / La cuisine de Farrah
import { rand, pick, shuffle } from '../../../util.js';
import { numberQ, wordQ } from '../../common.js';
import { beaker } from '../../../visuals-measure.js';
import { card } from '../../../visuals.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, baby: G } = FAMILY3;
const BADGES = () => L(['🍳 Cooking!', '🥣 Mix it!', '🥞 Recipe time!', '⚖️ Weigh it!'], ['🍳 On cuisine!', '🥣 On mélange!', '🥞 L’heure de la recette!', '⚖️ On pèse!']);

const CAP = () => [ // [emoji, thing, unit]
  ['🥛', L('a glass of milk', 'un verre de lait'), 'mL'], ['🧴', L('a spoonful of vanilla', 'une cuillerée de vanille'), 'mL'],
  ['🍲', L('a big pot of chili', 'une grosse marmite de chili'), 'L'], ['🛁', L('a bathtub of water', 'une baignoire d’eau'), 'L'],
  ['🧃', L('a small juice box', 'une petite boîte de jus'), 'mL'], ['🪣', L('a bucket of water', 'un seau d’eau'), 'L'],
];
const MASS = () => [
  ['🥚', L('an egg', 'un œuf'), 'g'], ['🌭', L('a sausage', 'une saucisse'), 'g'],
  ['🥣', L('a bowl of Cheerios', 'un bol de céréales'), 'g'], ['🌾', L('a big bag of flour', 'un gros sac de farine'), 'kg'],
  ['👶', L(`baby ${G}`, `bébé ${G}`), 'kg'], ['🐶', L('a puppy', 'un chiot'), 'kg'],
];

function unitQ() {
  const cap = Math.random() < 0.5;
  const [e, thing, u] = pick(cap ? CAP() : MASS());
  const opts = cap ? ['mL', 'L'] : ['g', 'kg'];
  return wordQ({
    key: `u-${e}`, badge: pick(BADGES()),
    text: cap ? L(`Which unit would you use to measure how much ${thing} holds?`, `Quelle unité utiliserais-tu pour mesurer la quantité dans ${thing}?`) : L(`Which unit would you use to measure the mass of ${thing}?`, `Quelle unité utiliserais-tu pour mesurer la masse de ${thing}?`),
    visual: card(`<span class="big-emoji">${e}</span>`),
    options: opts.map((o) => ({ value: o, label: cap ? (o === 'mL' ? L('millilitres (mL)', 'millilitres (mL)') : L('litres (L)', 'litres (L)')) : (o === 'g' ? L('grams (g)', 'grammes (g)') : L('kilograms (kg)', 'kilogrammes (kg)')) })),
    answer: u,
    hint: { text: cap ? L('Small amounts use mL. Big amounts use L. 1 L = 1000 mL.', 'Les petites quantités se mesurent en mL. Les grandes en L. 1 L = 1000 mL.') : L('Light things use grams. Heavy things use kilograms. 1 kg = 1000 g.', 'Les choses légères se mesurent en grammes. Les lourdes en kilogrammes. 1 kg = 1000 g.') },
  });
}

function readBeaker(mode, step) {
  const ml = rand(1, 1000 / step) * step;
  return numberQ({
    key: `bk-${ml}`, badge: pick(BADGES()),
    text: L(`${F} pours milk for pancakes. How many millilitres (mL) are in the measuring cup?`, `${F} verse du lait pour les crêpes. Combien de millilitres (mL) y a-t-il dans la tasse à mesurer?`),
    visual: card(beaker(ml, 1000, 100)),
    answer: ml, mode, max: 1000, min: 0, near: [step, -step, 100, -100, 50, -50],
    hint: { text: L('Find the line where the blue stops. Read the numbers: the lines count by 100.', 'Trouve la ligne où le bleu s’arrête. Lis les nombres : les lignes comptent par 100.') },
  });
}

function convert(mode) {
  const kind = pick(['L', 'kg']);
  const n = rand(2, 9);
  const toSmall = Math.random() < 0.6;
  const big = kind, small = kind === 'L' ? 'mL' : 'g';
  const name = (u) => ({ L: L('litres', 'litres'), kg: L('kilograms', 'kilogrammes'), mL: L('millilitres', 'millilitres'), g: L('grams', 'grammes') }[u]);
  const given = toSmall ? n : n * 1000, ans = toSmall ? n * 1000 : n;
  return numberQ({
    key: `cv-${kind}-${given}-${toSmall}`, badge: pick(BADGES()),
    text: L(`How many ${name(toSmall ? small : big)} are in ${given} ${name(toSmall ? big : small)}?`, `Combien y a-t-il de ${name(toSmall ? small : big)} dans ${given} ${name(toSmall ? big : small)}?`),
    big: `${given} ${toSmall ? big : small} = <span class="qbox">?</span> ${toSmall ? small : big}`,
    answer: ans, mode, max: 9000, min: 1, near: [1000, -1000, 100, -100, 10],
    hint: { text: L(`1 ${big} = 1000 ${small}. ${toSmall ? `${n} groups of 1000 make ${ans}.` : `${given} ÷ 1000 = ${ans}.`}`, `1 ${big} = 1000 ${small}. ${toSmall ? `${n} groupes de 1000 font ${ans}.` : `${given} ÷ 1000 = ${ans}.`}`) },
  });
}

function recipe(mode) {
  const a = pick([100, 200, 250, 300, 400]), b = pick([100, 150, 250, 300, 500]);
  const left = Math.random() < 0.5;
  if (left) {
    return numberQ({
      key: `rl-${a + b}-${a}`, badge: L('🥞 Recipe math!', '🥞 Maths de recette!'),
      text: L(`${F} has ${a + b} mL of batter. She uses ${a} mL for ${M}'s pancake. How many mL are left?`, `${F} a ${a + b} mL de pâte. Elle en utilise ${a} mL pour la crêpe de ${M}. Combien de mL reste-t-il?`),
      big: `${a + b} − ${a} = <span class="qbox">?</span>`,
      answer: b, mode, max: 1000, min: 50, near: [50, -50, 100, -100],
      hint: { text: L(`Subtract: ${a + b} − ${a}.`, `Soustrais : ${a + b} − ${a}.`) },
    });
  }
  return numberQ({
    key: `rs-${a}-${b}`, badge: L('🥞 Recipe math!', '🥞 Maths de recette!'),
    text: L(`The pancake recipe needs ${a} mL of milk and ${b} mL of water. How many mL of liquid in all?`, `La recette de crêpes demande ${a} mL de lait et ${b} mL d’eau. Combien de mL de liquide en tout?`),
    big: `${a} + ${b} = <span class="qbox">?</span>`,
    answer: a + b, mode, max: 1000, min: 100, near: [50, -50, 100, -100],
    hint: { text: L(`Add: ${a} + ${b}.`, `Additionne : ${a} + ${b}.`) },
  });
}

function compareQ() {
  const kind = pick(['L', 'kg']);
  const n = rand(1, 3);
  const small = kind === 'L' ? 'mL' : 'g';
  const other = pick([n * 1000 - 500, n * 1000 + 500, n * 1000 - 200, n * 1000 + 300]);
  const more = other > n * 1000 ? 'B' : 'A';
  return wordQ({
    key: `cmp-${kind}-${n}-${other}`, badge: L('⚖️ Which is more?', '⚖️ Lequel est plus?'),
    text: L('Which amount is MORE?', 'Quelle quantité est PLUS grande?'),
    options: [{ value: 'A', label: `${n} ${kind}` }, { value: 'B', label: `${other} ${small}` }],
    answer: more,
    hint: { text: L(`${n} ${kind} = ${n * 1000} ${small}. Compare ${n * 1000} and ${other}.`, `${n} ${kind} = ${n * 1000} ${small}. Compare ${n * 1000} et ${other}.`) },
  });
}

export default {
  id: 'kitchen',
  emoji: '🍳',
  theme: 'diner',
  color: '#f57c00',
  get title() { return L(`${F}'s Breakfast Kitchen`, `La cuisine de ${F}`); },
  get skill() { return L('Mass & capacity', 'Masse et capacité'); },
  get blurb() { return L('Measure milk, flour and Cheerios in mL, L, g and kg!', 'Mesure le lait, la farine et les céréales en mL, L, g et kg!'); },
  get intro() {
    return L(`${F} is cooking breakfast for the whole family! She needs to measure liquids and weigh ingredients.`,
      `${F} prépare le déjeuner pour toute la famille! Elle doit mesurer des liquides et peser des ingrédients.`);
  },
  get levels() {
    return {
      mild: { kid: L('Which unit?', 'Quelle unité?'), parent: 'Choosing mL or L for capacity and g or kg for mass; reading a measuring cup to the nearest 100 mL.' },
      medium: { kid: L('Read the measuring cup', 'Lis la tasse à mesurer'), parent: 'Reading capacity on a scale to 50 mL; recipe addition and subtraction in mL.' },
      spicy: { kid: L('Convert and compare', 'Convertir et comparer'), parent: 'Converting between L and mL and between kg and g (1000); comparing amounts in different units; recipes.' },
    };
  },
  get praise() { return L(['Perfect measure! 🥛', 'Chef Farrah! 👩‍🍳', 'Tasty math! 🥞'], ['Mesure parfaite! 🥛', 'Cheffe Farrah! 👩‍🍳', 'Des maths délicieuses! 🥞']); },
  get doneTitles() { return L(['Breakfast is served! 🍳', 'Measuring chef! 👩‍🍳'], ['Le déjeuner est servi! 🍳', 'Cheffe de la mesure! 👩‍🍳']); },
  makeQuestion(level, i) {
    const mode = i % 2 ? 'number' : 'choice';
    if (level === 'mild') return pick([unitQ, unitQ, () => readBeaker('choice', 100)])();
    if (level === 'medium') return pick([() => readBeaker(mode, 50), () => recipe(mode), unitQ, () => readBeaker('choice', 100)])();
    return pick([() => convert(mode), () => convert(mode), compareQ, () => recipe(mode)])();
  },
};
