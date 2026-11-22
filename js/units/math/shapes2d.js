// 2D SHAPES — Wizard Academy Potion Class 🧙‍♀️
import { rand, pick, sample, shuffle } from '../../util.js';
import { SHAPES2D, shapeSVG, shapePoints, randomFill } from '../../shapes2d.js';
import { numberQ, wordQ, visualQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';

const { kid: M } = FAMILY;
const PROF = 'Professor Hoot';

const MILD = ['circle', 'triangle', 'square', 'rectangle', 'pentagon', 'hexagon'];
const MEDIUM = [...MILD, 'oval', 'rhombus', 'trapezoid', 'octagon'];
const POLY_MED = ['triangle', 'square', 'rectangle', 'rhombus', 'trapezoid', 'pentagon', 'hexagon', 'octagon'];
const QUADS = ['square', 'rectangle', 'rhombus', 'trapezoid'];

const BADGES = ['🧪 Potion class!', '🔮 Crystal hunt!', '🪄 Spell practice!', '🦉 Ask Professor Hoot!'];
const INGREDIENTS = ['crystal', 'gem', 'magic cookie', 'potion stone', 'star charm'];

const cap = (w) => w[0].toUpperCase() + w.slice(1);
const a = (w) => (/^[aeiou]/.test(w) ? `an ${w}` : `a ${w}`);
const rot = (on) => (on ? rand(0, 7) * 45 : 0);

function factsHint(name, opts = {}) {
  const s = SHAPES2D[name];
  if (!s.sides) return { text: `${cap(a(name))} is round. It has no straight sides and no corners.`, visual: card(shapeSVG(name, opts)) };
  return {
    text: `${cap(a(name))} has ${s.sides} straight sides and ${s.vertices} vertices (corners). Count the dots!`,
    visual: card(shapeSVG(name, { ...opts, dots: true })),
  };
}

function tapShape(set, rotate) {
  const target = pick(set);
  const opts = sample(set, 4, target);
  const ing = pick(INGREDIENTS);
  const text = `${PROF} needs ${a(target)} ${ing} for the potion. Tap the ${target}!`;
  return visualQ({
    key: `tap-${target}-${opts.join()}`,
    badge: pick(BADGES), text,
    options: opts.map((name) => ({ value: name, html: shapeSVG(name, { rot: rot(rotate) }) })),
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
    badge: pick(BADGES),
    text: 'What is the name of this magic shape?',
    visual: card(shapeSVG(target, { rot: r, fill }), 'big'),
    options: sample(set, 3, target),
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
  const word = kind === 'sides' ? 'sides' : 'vertices (corners)';
  return numberQ({
    key: `${kind}-${target}`,
    badge: pick(BADGES),
    text: `How many ${word} does this shape have?`,
    visual: card(shapeSVG(target, { points, fill }), 'big'),
    answer: n,
    min: 3, max: 10, near: [1, -1, 2, -2],
    hint: {
      text: kind === 'sides'
        ? 'Touch each straight side with your finger and count. The dots show where the sides meet.'
        : 'Count the dots! Each dot is a vertex (a corner).',
      visual: card(shapeSVG(target, { points, fill, dots: true }), 'big'),
    },
  });
}

const RIDDLES = [
  { a: 'triangle', t: 'I have 3 sides and 3 vertices. What am I?' },
  { a: 'square', t: 'I have 4 sides that are all the same length, and 4 square corners. What am I?' },
  { a: 'rectangle', t: 'I have 4 sides and 4 square corners. Two of my sides are long and two are short. What am I?' },
  { a: 'pentagon', t: 'I have 5 sides and 5 vertices. What am I?' },
  { a: 'hexagon', t: 'I have 6 sides and 6 vertices. What am I?' },
  { a: 'octagon', t: 'I have 8 sides, like a stop sign. What am I?' },
  { a: 'circle', t: 'I am round. I have no sides and no vertices. What am I?' },
  { a: 'trapezoid', t: 'I have 4 sides. Only 2 of my sides are parallel, like train tracks. What am I?' },
];

function riddle() {
  const r = pick(RIDDLES);
  return wordQ({
    key: `riddle-${r.a}`, badge: '🦉 Riddle time!', text: r.t,
    options: sample(['triangle', 'square', 'rectangle', 'pentagon', 'hexagon', 'octagon', 'circle', 'trapezoid'], 4, r.a),
    answer: r.a, hint: factsHint(r.a),
  });
}

function wobbly() {
  const n = pick([3, 5, 6, 6, 8]);
  const name = { 3: 'triangle', 5: 'pentagon', 6: 'hexagon', 8: 'octagon' }[n];
  const points = shapePoints(name, { irregular: true });
  const fill = randomFill();
  return wordQ({
    key: `wobbly-${n}-${rand(0, 3)}`,
    badge: '🪄 Wobbly spell!',
    text: 'A spell made this shape wobbly! What is it called?',
    visual: card(shapeSVG(name, { points, fill }), 'big'),
    options: sample(['triangle', 'pentagon', 'hexagon', 'octagon'], 3, name),
    answer: name,
    hint: {
      text: "Shapes can look funny and still have the same name! Count the vertices.",
      visual: card(shapeSVG(name, { points, fill, dots: true }), 'big'),
    },
  });
}

function notQuad() {
  const odd = pick(['triangle', 'pentagon', 'hexagon', 'circle']);
  const quads = sample(QUADS, 3);
  const opts = shuffle([odd, ...quads]);
  return visualQ({
    key: `notquad-${odd}-${quads.join()}`,
    badge: '🔮 Odd one out!',
    text: 'A quadrilateral has 4 sides. Which one is NOT a quadrilateral?',
    options: opts.map((name) => ({ value: name, html: shapeSVG(name, { rot: rot(true) }) })),
    answer: odd,
    hint: { text: 'Count the sides on each shape. Find the one that does not have 4.' },
  });
}

function mostVertices() {
  const opts = sample(POLY_MED.filter((x) => !['square', 'rectangle', 'rhombus'].includes(x)), 3);
  const answer = opts.reduce((a, b) => (SHAPES2D[b].vertices > SHAPES2D[a].vertices ? b : a));
  return visualQ({
    key: `most-${opts.sort().join()}`,
    badge: '⭐ Star challenge!',
    text: 'Which shape has the MOST vertices (corners)?',
    options: shuffle(opts).map((name) => ({ value: name, html: shapeSVG(name, { rot: rot(true) }) })),
    answer,
    hint: { text: 'Count the corners on each shape. Which number is biggest?' },
  });
}

function sidesInAll() {
  const name = pick(['triangle', 'square', 'pentagon', 'hexagon']);
  const k = pick([2, 3]);
  const s = SHAPES2D[name].sides;
  const text = `${M} needs ${k} ${name}s for her potion. How many sides in all?`;
  return numberQ({
    key: `allsides-${name}-${k}`, badge: '🧪 Potion math!', text,
    visual: card(Array.from({ length: k }, () => shapeSVG(name)).join(''), 'row'),
    answer: s * k, min: 3, max: 30, near: [1, -1, s, -s, 2],
    hint: { text: `Each ${name} has ${s} sides. Add ${Array(k).fill(s).join(' + ')}.` },
  });
}

export default {
  id: 'shapes2d',
  title: 'Potion Class',
  skill: '2D shapes',
  emoji: '🧙‍♀️',
  theme: 'wizard',
  color: '#7b4dff',
  blurb: 'Find magic shapes for Professor Hoot’s potions!',
  intro: `Welcome to Wizard Academy, ${M}! ${PROF} the owl needs magic shapes for today's potion.`,
  levels: {
    mild: { kid: 'Name the shapes', parent: 'Identify circle, triangle, square, rectangle, pentagon, hexagon (standard orientation).' },
    medium: { kid: 'Count sides and corners', parent: 'Adds oval, rhombus, trapezoid, octagon; shapes rotated; counting sides and vertices.' },
    spicy: { kid: 'Riddles, wobbly shapes and tricky ones', parent: 'Shape riddles from attributes, irregular polygons, quadrilaterals, comparing vertices, total sides.' },
  },
  praise: ['Magical! ✨', 'Spell cast! 🪄', 'Hoo-ray! 🦉', 'Potion perfect! 🧪'],
  doneTitles: ['Potion complete! 🧪', 'Top of the class! 🦉', 'You are a shape wizard! 🧙‍♀️'],
  makeQuestion(level, i) {
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
