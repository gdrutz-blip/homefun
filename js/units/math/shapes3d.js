// 3D SHAPES — Gymnastics Meet 🤸‍♀️
import { rand, pick, sample, shuffle } from '../../util.js';
import { SHAPES3D, solidSVG } from '../../shapes3d.js';
import { numberQ, wordQ, visualQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';

const { kid: M, bigSister: F } = FAMILY;
const ALL = Object.keys(SHAPES3D);
const MILD = ['cube', 'prism', 'sphere', 'cylinder', 'cone', 'pyramid'];
const name = (k) => SHAPES3D[k].name;
const BADGES = ['🤸‍♀️ Floor routine!', '🏅 Balance beam!', '🥇 Vault time!', '🎀 Ribbon dance!', '🤸‍♀️ Warm-up!'];
const COACH = `Coach ${F}`;

function factHint(k) {
  const s = SHAPES3D[k];
  const facts = {
    cube: 'A cube is like a dice. All 6 faces are squares.',
    prism: 'A rectangular prism is like a box. Its faces are rectangles.',
    sphere: 'A sphere is round like a ball. It has no flat faces.',
    cylinder: 'A cylinder is like a can. It has 2 flat circle faces and can roll.',
    cone: 'A cone is like an ice cream cone. It has 1 circle face and a point on top.',
    pyramid: 'A pyramid has a square bottom and triangle faces that meet at a point.',
    triprism: 'A triangular prism is like a tent. It has 2 triangle faces and 3 rectangle faces.',
  };
  return { text: facts[k], visual: card(solidSVG(k), 'big') + (s.things[0] ? `<div class="thing-emoji">${s.things.map((t) => t.e).join(' ')}</div>` : '') };
}

function tapSolid(set) {
  const target = pick(set);
  const opts = sample(set, 4, target);
  const text = `${COACH} says: find the ${name(target)}! Tap it.`;
  return visualQ({
    key: `tap3-${target}-${opts.join()}`, badge: pick(BADGES), text,
    options: opts.map((k) => ({ value: k, html: solidSVG(k) })),
    answer: target, hint: factHint(target),
  });
}

function nameSolid(set) {
  const target = pick(set);
  return wordQ({
    key: `name3-${target}`, badge: pick(BADGES),
    text: `${M} lands on a mat shaped like this. What is the shape called?`,
    visual: card(solidSVG(target), 'big'),
    options: sample(set, 3, target).map(name),
    answer: name(target), hint: factHint(target),
  });
}

function realWorld(set) {
  const withThings = set.filter((k) => SHAPES3D[k].things.length);
  const target = pick(withThings);
  const thing = pick(SHAPES3D[target].things);
  return wordQ({
    key: `real-${thing.e}`, badge: '🎒 In the gym bag!',
    text: `${M} finds ${thing.name} in her gym bag. What shape is it?`,
    visual: `<div class="thing-emoji huge">${thing.e}</div>`,
    options: sample(withThings, 3, target).map(name),
    answer: name(target), hint: factHint(target),
  });
}

function rollQ() {
  const canRoll = pick([true, false]);
  const yes = ALL.filter((k) => SHAPES3D[k].rolls === canRoll);
  const no = ALL.filter((k) => SHAPES3D[k].rolls !== canRoll);
  const target = pick(yes);
  const opts = shuffle([target, ...sample(no, 2)]);
  return visualQ({
    key: `roll-${canRoll}-${target}-${opts.join()}`, badge: '🤸‍♀️ Forward roll!',
    text: canRoll ? 'Which shape can ROLL like a gymnast?' : 'Which shape can NOT roll?',
    options: opts.map((k) => ({ value: k, html: solidSVG(k) })),
    answer: target,
    hint: { text: 'Shapes with a curved surface can roll. Shapes with only flat faces slide instead.' },
  });
}

function stackQ() {
  const target = pick(['cube', 'prism', 'cylinder', 'triprism']);
  const opts = shuffle([target, ...sample(['sphere', 'cone', 'pyramid'], 2)]);
  return visualQ({
    key: `stack-${target}-${opts.join()}`, badge: '🏗️ Stack the mats!',
    text: `${COACH} wants to stack mats in a tall tower. Which shape can stack?`,
    options: opts.map((k) => ({ value: k, html: solidSVG(k) })),
    answer: target,
    hint: { text: 'To stack, a shape needs a flat face on the top AND the bottom.' },
  });
}

function facesQ(set) {
  const k = pick(set);
  return numberQ({
    key: `faces-${k}`, badge: pick(BADGES),
    text: `How many flat faces does a ${name(k)} have?`,
    visual: card(solidSVG(k), 'big'),
    answer: SHAPES3D[k].faces, min: 0, max: 8, near: [1, -1, 2, -2],
    hint: { text: 'A face is a flat side you could stamp in paint. Don\'t forget the faces you can\'t see — the dashed lines show the back!' },
  });
}

function faceShapeQ() {
  const k = pick(['cube', 'prism', 'cylinder', 'cone']);
  const ans = SHAPES3D[k].faceShape;
  return wordQ({
    key: `faceshape-${k}`, badge: '🎨 Paint stamp!',
    text: `${M} dips a ${name(k)} in paint and stamps it. What shape is the stamp?`,
    visual: card(solidSVG(k), 'big'),
    options: sample(['circle', 'square', 'rectangle', 'triangle'], 3, ans),
    answer: ans,
    hint: { text: `Look at the flat face of the ${name(k)}. What 2D shape is it?` },
  });
}

function edgesVerticesQ() {
  const k = pick(['cube', 'prism', 'pyramid', 'triprism']);
  const kind = pick(['edges', 'vertices']);
  const ans = SHAPES3D[k][kind];
  return numberQ({
    key: `${kind}-${k}`, badge: pick(BADGES),
    text: kind === 'edges'
      ? `How many edges does a ${name(k)} have? (An edge is where two faces meet.)`
      : `How many vertices does a ${name(k)} have? (A vertex is a corner point.)`,
    visual: card(solidSVG(k), 'big'),
    answer: ans, min: 1, max: 14, near: [1, -1, 2, -2, 4, -4],
    mode: rand(0, 1) ? 'number' : 'choice',
    hint: {
      text: kind === 'edges'
        ? 'Count the lines, even the dashed ones at the back. Go slowly!'
        : 'Count the corner points, even the hidden one at the back where the dashed lines meet.',
    },
  });
}

const RIDDLES = [
  { k: 'cube', t: 'I have 6 flat faces. They are all squares. What am I?' },
  { k: 'cone', t: 'I have 1 flat face, 1 point on top, and I can roll. What am I?' },
  { k: 'cylinder', t: 'I have 2 flat circle faces and I can roll. What am I?' },
  { k: 'pyramid', t: 'I have 5 faces: 1 square and 4 triangles. What am I?' },
  { k: 'triprism', t: 'I have 5 faces: 2 triangles and 3 rectangles. What am I?' },
  { k: 'sphere', t: 'I have no flat faces, no edges and no vertices. What am I?' },
  { k: 'prism', t: 'I have 6 faces. They are rectangles, like a cereal box. What am I?' },
];

function riddle() {
  const r = pick(RIDDLES);
  const opts = sample(ALL, 4, r.k);
  return visualQ({
    key: `r3-${r.k}`, badge: '🏆 Riddle round!', text: r.t,
    options: opts.map((k) => ({ value: k, html: solidSVG(k) })),
    answer: r.k, hint: factHint(r.k),
  });
}

function compareVertices() {
  const [a, b] = sample(['cube', 'pyramid', 'triprism', 'cone'], 2);
  if (SHAPES3D[a].vertices === SHAPES3D[b].vertices) return compareVertices();
  const answer = SHAPES3D[a].vertices > SHAPES3D[b].vertices ? a : b;
  return visualQ({
    key: `cmpv-${[a, b].sort().join()}`, badge: '🥇 Gold medal question!',
    text: 'Which shape has MORE vertices (corners)?',
    options: [a, b].map((k) => ({ value: k, html: solidSVG(k) })),
    answer,
    hint: { text: `A ${name(a)} has ${SHAPES3D[a].vertices}. A ${name(b)} has ${SHAPES3D[b].vertices}. Which is more?` },
  });
}

export default {
  id: 'shapes3d',
  title: 'Gymnastics Meet',
  skill: '3D shapes',
  emoji: '🤸‍♀️',
  theme: 'gym',
  color: '#ff7a1a',
  blurb: 'Mats, beams and vaults — find the 3D shapes!',
  intro: `It's the big gymnastics meet! ${COACH} needs help with all the 3D shapes in the gym.`,
  levels: {
    mild: { kid: 'Name the 3D shapes', parent: 'Identify cube, rectangular prism, sphere, cylinder, cone, pyramid; match to real objects.' },
    medium: { kid: 'Roll, stack and count faces', parent: 'Roll vs. slide, stacking, counting flat faces, shape of faces; adds triangular prism.' },
    spicy: { kid: 'Edges, vertices and riddles', parent: 'Counting edges and vertices (cube, prisms, pyramid), riddles from properties, comparing vertices.' },
  },
  praise: ['Stuck the landing! 🤸‍♀️', 'Perfect 10! 🥇', 'What a cartwheel! 🤸‍♀️', 'Gold medal answer! 🏅'],
  doneTitles: ['Gold medal! 🥇', 'What a routine! 🤸‍♀️', 'The judges say 10! 🏆'],
  makeQuestion(level, i) {
    if (level === 'mild') return pick([tapSolid, tapSolid, nameSolid, realWorld])(MILD);
    if (level === 'medium') return pick([() => tapSolid(ALL), () => realWorld(ALL), rollQ, stackQ, () => facesQ(ALL), faceShapeQ])();
    return pick([edgesVerticesQ, edgesVerticesQ, riddle, riddle, compareVertices, () => facesQ(ALL)])();
  },
};
