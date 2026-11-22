// 2D SHAPES — Wizard Academy Potion Class 🧙‍♀️ / Le cours de potions
import { rand, pick, sample, shuffle } from '../../util.js';
import { SHAPES2D, shapeSVG, shapePoints, randomFill } from '../../shapes2d.js';
import { numberQ, wordQ, visualQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L, aAn, cap } from '../../i18n.js';

const { kid: M } = FAMILY;
const PROF = () => L('Professor Hoot', 'Professeur Hibou');

const MILD = ['circle', 'triangle', 'square', 'rectangle', 'pentagon', 'hexagon'];
const MEDIUM = [...MILD, 'oval', 'rhombus', 'trapezoid', 'octagon'];
const POLY_MED = ['triangle', 'square', 'rectangle', 'rhombus', 'trapezoid', 'pentagon', 'hexagon', 'octagon'];
const QUADS = ['square', 'rectangle', 'rhombus', 'trapezoid'];

/** Shape name in the current language. All French 2D shape names are masculine ("un"). */
const nm = (k) => L(SHAPES2D[k].name, SHAPES2D[k].fr);
const aNm = (k) => L(aAn(SHAPES2D[k].name), `un ${SHAPES2D[k].fr}`);
const opt = (k) => ({ value: k, label: nm(k) });

const BADGES = () => L(
  ['🧪 Potion class!', '🔮 Crystal hunt!', '🪄 Spell practice!', '🦉 Ask Professor Hoot!'],
  ['🧪 Cours de potions!', '🔮 Chasse aux cristaux!', '🪄 Pratique de sorts!', '🦉 Demande au Professeur Hibou!'],
);
const INGREDIENTS = () => L(['crystal', 'gem', 'magic cookie', 'potion stone', 'star charm'], ['cristal', 'joyau', 'biscuit magique', 'caillou magique', 'porte-bonheur']);

const rot = (on) => (on ? rand(0, 7) * 45 : 0);

function factsHint(k, opts = {}) {
  const s = SHAPES2D[k];
  if (!s.sides) {
    return {
      text: L(`${cap(aNm(k))} is round. It has no straight sides and no corners.`, `${cap(aNm(k))} est rond. Il n'a pas de côtés droits et pas de sommets.`),
      visual: card(shapeSVG(k, opts)),
    };
  }
  return {
    text: L(`${cap(aNm(k))} has ${s.sides} straight sides and ${s.vertices} vertices (corners). Count the dots!`,
      `${cap(aNm(k))} a ${s.sides} côtés droits et ${s.vertices} sommets (coins). Compte les points!`),
    visual: card(shapeSVG(k, { ...opts, dots: true })),
  };
}

function tapShape(set, rotate) {
  const target = pick(set);
  const opts = sample(set, 4, target);
  const ing = pick(INGREDIENTS());
  const text = L(`${PROF()} needs ${aNm(target)} ${ing} for the potion. Tap the ${nm(target)}!`,
    `${PROF()} a besoin d'un ${ing} en forme de ${nm(target)} pour la potion. Touche le ${nm(target)}!`);
  return visualQ({
    key: `tap-${target}-${opts.join()}`,
    badge: pick(BADGES()), text,
    options: opts.map((k) => ({ value: k, html: shapeSVG(k, { rot: rot(rotate) }) })),
    answer: target,
    hint: factsHint(target),
  });
}

function nameShape(set, rotate) {
  const target = pick(set);
  const r = rot(rotate);
  const fill = randomFill();
  return wordQ({
    key: `name-${target}-${r}`,
    badge: pick(BADGES()),
    text: L('What is the name of this magic shape?', 'Comment s’appelle cette figure magique?'),
    visual: card(shapeSVG(target, { rot: r, fill }), 'big'),
    options: sample(set, 3, target).map(opt),
    answer: target,
    hint: factsHint(target, { rot: r, fill }),
  });
}

function countQ(kind, set) {
  const target = pick(set);
  const r = rot(true);
  const fill = randomFill();
  const points = shapePoints(target, { rot: r });
  const n = SHAPES2D[target].sides;
  return numberQ({
    key: `${kind}-${target}`,
    badge: pick(BADGES()),
    text: kind === 'sides'
      ? L('How many sides does this shape have?', 'Combien de côtés a cette figure?')
      : L('How many vertices (corners) does this shape have?', 'Combien de sommets (coins) a cette figure?'),
    visual: card(shapeSVG(target, { points, fill }), 'big'),
    answer: n,
    min: 3, max: 10, near: [1, -1, 2, -2],
    hint: {
      text: kind === 'sides'
        ? L('Touch each straight side with your finger and count. The dots show where the sides meet.',
          'Touche chaque côté droit avec ton doigt et compte. Les points montrent où les côtés se rencontrent.')
        : L('Count the dots! Each dot is a vertex (a corner).', 'Compte les points! Chaque point est un sommet (un coin).'),
      visual: card(shapeSVG(target, { points, fill, dots: true }), 'big'),
    },
  });
}

const RIDDLES = () => [
  { a: 'triangle', t: L('I have 3 sides and 3 vertices. What am I?', "J'ai 3 côtés et 3 sommets. Qui suis-je?") },
  { a: 'square', t: L('I have 4 sides that are all the same length, and 4 square corners. What am I?', "J'ai 4 côtés de la même longueur et 4 coins droits. Qui suis-je?") },
  { a: 'rectangle', t: L('I have 4 sides and 4 square corners. Two of my sides are long and two are short. What am I?', "J'ai 4 côtés et 4 coins droits. Deux côtés sont longs et deux sont courts. Qui suis-je?") },
  { a: 'pentagon', t: L('I have 5 sides and 5 vertices. What am I?', "J'ai 5 côtés et 5 sommets. Qui suis-je?") },
  { a: 'hexagon', t: L('I have 6 sides and 6 vertices. What am I?', "J'ai 6 côtés et 6 sommets. Qui suis-je?") },
  { a: 'octagon', t: L('I have 8 sides, like a stop sign. What am I?', "J'ai 8 côtés, comme un panneau d'arrêt. Qui suis-je?") },
  { a: 'circle', t: L('I am round. I have no sides and no vertices. What am I?', "Je suis rond. Je n'ai pas de côtés et pas de sommets. Qui suis-je?") },
  { a: 'trapezoid', t: L('I have 4 sides. Only 2 of my sides are parallel, like train tracks. What am I?', "J'ai 4 côtés. Seulement 2 côtés sont parallèles, comme des rails de train. Qui suis-je?") },
];

function riddle() {
  const r = pick(RIDDLES());
  return wordQ({
    key: `riddle-${r.a}`, badge: L('🦉 Riddle time!', '🦉 Devinette!'), text: r.t,
    options: sample(['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'octagon', 'circle', 'trapezoid'], 4, r.a).map(opt),
    answer: r.a, hint: factsHint(r.a),
  });
}

function wobbly() {
  const n = pick([3, 5, 6, 6, 8]);
  const k = { 3: 'triangle', 5: 'pentagon', 6: 'hexagon', 8: 'octagon' }[n];
  const points = shapePoints(k, { irregular: true });
  const fill = randomFill();
  return wordQ({
    key: `wobbly-${n}-${rand(0, 3)}`,
    badge: L('🪄 Wobbly spell!', '🪄 Sort tordu!'),
    text: L('A spell made this shape wobbly! What is it called?', 'Un sort a tordu cette figure! Comment s’appelle-t-elle?'),
    visual: card(shapeSVG(k, { points, fill }), 'big'),
    options: sample(['triangle', 'pentagon', 'hexagon', 'octagon'], 3, k).map(opt),
    answer: k,
    hint: {
      text: L('Shapes can look funny and still have the same name! Count the vertices.', 'Une figure peut avoir l’air bizarre et garder le même nom! Compte les sommets.'),
      visual: card(shapeSVG(k, { points, fill, dots: true }), 'big'),
    },
  });
}

function notQuad() {
  const odd = pick(['triangle', 'pentagon', 'hexagon', 'circle']);
  const quads = sample(QUADS, 3);
  const opts = shuffle([odd, ...quads]);
  return visualQ({
    key: `notquad-${odd}-${quads.join()}`,
    badge: L('🔮 Odd one out!', '🔮 L’intrus!'),
    text: L('A quadrilateral has 4 sides. Which one is NOT a quadrilateral?', "Un quadrilatère a 4 côtés. Lequel n'est PAS un quadrilatère?"),
    options: opts.map((k) => ({ value: k, html: shapeSVG(k, { rot: rot(true) }) })),
    answer: odd,
    hint: { text: L('Count the sides on each shape. Find the one that does not have 4.', "Compte les côtés de chaque figure. Trouve celle qui n'en a pas 4.") },
  });
}

function mostVertices() {
  const opts = sample(POLY_MED.filter((x) => !['square', 'rectangle', 'rhombus'].includes(x)), 3);
  const answer = opts.reduce((a, b) => (SHAPES2D[b].vertices > SHAPES2D[a].vertices ? b : a));
  return visualQ({
    key: `most-${[...opts].sort().join()}`,
    badge: L('⭐ Star challenge!', '⭐ Défi étoile!'),
    text: L('Which shape has the MOST vertices (corners)?', 'Quelle figure a le PLUS de sommets (coins)?'),
    options: shuffle(opts).map((k) => ({ value: k, html: shapeSVG(k, { rot: rot(true) }) })),
    answer,
    hint: { text: L('Count the corners on each shape. Which number is biggest?', 'Compte les coins de chaque figure. Quel nombre est le plus grand?') },
  });
}

function sidesInAll() {
  const k = pick(['triangle', 'square', 'pentagon', 'hexagon']);
  const count = pick([2, 3]);
  const s = SHAPES2D[k].sides;
  const plural = L(`${SHAPES2D[k].name}s`, k === 'square' ? 'carrés' : `${SHAPES2D[k].fr}s`);
  const text = L(`${M} needs ${count} ${plural} for her potion. How many sides in all?`,
    `${M} a besoin de ${count} ${plural} pour sa potion. Combien de côtés en tout?`);
  return numberQ({
    key: `allsides-${k}-${count}`, badge: L('🧪 Potion math!', '🧪 Maths magiques!'), text,
    visual: card(Array.from({ length: count }, () => shapeSVG(k)).join(''), 'row'),
    answer: s * count, min: 3, max: 30, near: [1, -1, s, -s, 2],
    hint: { text: L(`Each ${nm(k)} has ${s} sides. Add ${Array(count).fill(s).join(' + ')}.`, `Chaque ${nm(k)} a ${s} côtés. Additionne ${Array(count).fill(s).join(' + ')}.`) },
  });
}

export default {
  id: 'shapes2d',
  emoji: '🧙‍♀️',
  theme: 'wizard',
  color: '#7b4dff',
  get title() { return L('Potion Class', 'Le cours de potions'); },
  get skill() { return L('2D shapes', 'Les figures planes'); },
  get blurb() { return L('Find magic shapes for Professor Hoot’s potions!', 'Trouve des figures magiques pour les potions du Professeur Hibou!'); },
  get intro() {
    return L(`Welcome to Wizard Academy, ${M}! Professor Hoot the owl needs magic shapes for today's potion.`,
      `Bienvenue à l'école des sorciers, ${M}! Professeur Hibou a besoin de figures magiques pour la potion du jour.`);
  },
  get levels() {
    return {
      mild: { kid: L('Name the shapes', 'Nomme les figures'), parent: 'Identify circle, triangle, square, rectangle, pentagon, hexagon (standard orientation).' },
      medium: { kid: L('Count sides and corners', 'Compte les côtés et les sommets'), parent: 'Adds oval, rhombus, trapezoid, octagon; shapes rotated; counting sides and vertices.' },
      spicy: { kid: L('Riddles, wobbly shapes and tricky ones', 'Devinettes, figures tordues et pièges'), parent: 'Shape riddles from attributes, irregular polygons, quadrilaterals, comparing vertices, total sides.' },
    };
  },
  get praise() { return L(['Magical! ✨', 'Spell cast! 🪄', 'Hoo-ray! 🦉', 'Potion perfect! 🧪'], ['Magique! ✨', 'Sort réussi! 🪄', 'Hou hou, bravo! 🦉', 'Potion parfaite! 🧪']); },
  get doneTitles() { return L(['Potion complete! 🧪', 'Top of the class! 🦉', 'You are a shape wizard! 🧙‍♀️'], ['La potion est prête! 🧪', 'Première de classe! 🦉', 'Tu es une sorcière des figures! 🧙‍♀️']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([tapShape, tapShape, nameShape])(MILD, false);
    if (level === 'medium') {
      const k = pick(['tap', 'name', 'sides', 'vertices']);
      if (k === 'tap') return tapShape(MEDIUM, true);
      if (k === 'name') return nameShape(MEDIUM, true);
      return countQ(k, POLY_MED);
    }
    return pick([riddle, riddle, wobbly, wobbly, notQuad, mostVertices, sidesInAll])();
  },
};
