// 3D SHAPES — Gymnastics Meet 🤸‍♀️ / La compétition de gymnastique
import { rand, pick, sample, shuffle } from '../../util.js';
import { SHAPES3D, solidSVG } from '../../shapes3d.js';
import { numberQ, wordQ, visualQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F } = FAMILY;
const ALL = Object.keys(SHAPES3D);
const MILD = ['cube', 'prism', 'sphere', 'cylinder', 'cone', 'pyramid'];

const nm = (k) => L(SHAPES3D[k].name, SHAPES3D[k].fr);
const un = (k) => L(`a ${SHAPES3D[k].name}`, `${SHAPES3D[k].g === 'f' ? 'une' : 'un'} ${SHAPES3D[k].fr}`);
const le = (k) => L(`the ${SHAPES3D[k].name}`, `${SHAPES3D[k].g === 'f' ? 'la' : 'le'} ${SHAPES3D[k].fr}`);
const opt = (k) => ({ value: k, label: nm(k) });
const thingName = (t) => L(t.name, t.fr);

const FLAT = { circle: ['circle', 'cercle'], square: ['square', 'carré'], rectangle: ['rectangle', 'rectangle'], triangle: ['triangle', 'triangle'] };
const flatOpt = (k) => ({ value: k, label: L(...FLAT[k]) });

const BADGES = () => L(
  ['🤸‍♀️ Floor routine!', '🏅 Balance beam!', '🥇 Vault time!', '🎀 Ribbon dance!', '🤸‍♀️ Warm-up!'],
  ['🤸‍♀️ Exercice au sol!', '🏅 La poutre!', '🥇 Le saut!', '🎀 Danse du ruban!', '🤸‍♀️ Échauffement!'],
);
const COACH = () => L(`Coach ${F}`, `L'entraîneuse ${F}`);

function factHint(k) {
  const s = SHAPES3D[k];
  const facts = {
    cube: L('A cube is like a dice. All 6 faces are squares.', 'Un cube ressemble à un dé. Ses 6 faces sont des carrés.'),
    prism: L('A rectangular prism is like a box. Its faces are rectangles.', 'Un prisme rectangulaire ressemble à une boîte. Ses faces sont des rectangles.'),
    sphere: L('A sphere is round like a ball. It has no flat faces.', "Une sphère est ronde comme un ballon. Elle n'a pas de faces planes."),
    cylinder: L('A cylinder is like a can. It has 2 flat circle faces and can roll.', 'Un cylindre ressemble à une boîte de conserve. Il a 2 faces planes en forme de cercle et il peut rouler.'),
    cone: L('A cone is like an ice cream cone. It has 1 circle face and a point on top.', 'Un cône ressemble à un cornet de crème glacée. Il a 1 face en forme de cercle et une pointe en haut.'),
    pyramid: L('A pyramid has a square bottom and triangle faces that meet at a point.', 'Une pyramide a une base carrée et des faces en triangle qui se rejoignent en une pointe.'),
    triprism: L('A triangular prism is like a tent. It has 2 triangle faces and 3 rectangle faces.', 'Un prisme triangulaire ressemble à une tente. Il a 2 faces en triangle et 3 faces rectangulaires.'),
  };
  return { text: facts[k], visual: card(solidSVG(k), 'big') + (s.things[0] ? `<div class="thing-emoji">${s.things.map((t) => t.e).join(' ')}</div>` : '') };
}

function tapSolid(set) {
  const target = pick(set);
  const opts = sample(set, 4, target);
  const text = L(`${COACH()} says: find the ${nm(target)}! Tap it.`, `${COACH()} dit : trouve ${le(target)}! Touche-${SHAPES3D[target].g === 'f' ? 'la' : 'le'}.`);
  return visualQ({
    key: `tap3-${target}-${opts.join()}`, badge: pick(BADGES()), text,
    options: opts.map((k) => ({ value: k, html: solidSVG(k) })),
    answer: target, hint: factHint(target),
  });
}

function nameSolid(set) {
  const target = pick(set);
  return wordQ({
    key: `name3-${target}`, badge: pick(BADGES()),
    text: L(`${M} lands on a mat shaped like this. What is the shape called?`, `${M} atterrit sur un tapis qui a cette forme. Comment s'appelle ce solide?`),
    visual: card(solidSVG(target), 'big'),
    options: sample(set, 3, target).map(opt),
    answer: target, hint: factHint(target),
  });
}

function realWorld(set) {
  const withThings = set.filter((k) => SHAPES3D[k].things.length);
  const target = pick(withThings);
  const thing = pick(SHAPES3D[target].things);
  return wordQ({
    key: `real-${thing.e}`, badge: L('🎒 In the gym bag!', '🎒 Dans le sac de sport!'),
    text: L(`${M} finds ${thing.name} in her gym bag. What shape is it?`, `${M} trouve ${thing.fr} dans son sac de sport. Quel solide est-ce?`),
    visual: `<div class="thing-emoji huge">${thing.e}</div>`,
    options: sample(withThings, 3, target).map(opt),
    answer: target, hint: factHint(target),
  });
}

function rollQ() {
  const canRoll = pick([true, false]);
  const yes = ALL.filter((k) => SHAPES3D[k].rolls === canRoll);
  const no = ALL.filter((k) => SHAPES3D[k].rolls !== canRoll);
  const target = pick(yes);
  const opts = shuffle([target, ...sample(no, 2)]);
  return visualQ({
    key: `roll-${canRoll}-${target}-${opts.join()}`, badge: L('🤸‍♀️ Forward roll!', '🤸‍♀️ Roulade avant!'),
    text: canRoll
      ? L('Which shape can ROLL like a gymnast?', 'Quel solide peut ROULER comme une gymnaste?')
      : L('Which shape can NOT roll?', 'Quel solide NE PEUT PAS rouler?'),
    options: opts.map((k) => ({ value: k, html: solidSVG(k) })),
    answer: target,
    hint: { text: L('Shapes with a curved surface can roll. Shapes with only flat faces slide instead.', 'Les solides avec une surface courbe peuvent rouler. Ceux qui ont seulement des faces planes glissent.') },
  });
}

function stackQ() {
  const target = pick(['cube', 'prism', 'cylinder', 'triprism']);
  const opts = shuffle([target, ...sample(['sphere', 'cone', 'pyramid'], 2)]);
  return visualQ({
    key: `stack-${target}-${opts.join()}`, badge: L('🏗️ Stack the mats!', '🏗️ Empile les tapis!'),
    text: L(`${COACH()} wants to stack mats in a tall tower. Which shape can stack?`, `${COACH()} veut empiler les tapis en une grande tour. Quel solide peut s'empiler?`),
    options: opts.map((k) => ({ value: k, html: solidSVG(k) })),
    answer: target,
    hint: { text: L('To stack, a shape needs a flat face on the top AND the bottom.', "Pour s'empiler, un solide a besoin d'une face plane en haut ET en bas.") },
  });
}

function facesQ(set) {
  const k = pick(set);
  return numberQ({
    key: `faces-${k}`, badge: pick(BADGES()),
    text: L(`How many flat faces does ${un(k)} have?`, `Combien de faces planes a ${un(k)}?`),
    visual: card(solidSVG(k), 'big'),
    answer: SHAPES3D[k].faces, min: 0, max: 8, near: [1, -1, 2, -2],
    hint: {
      text: L("A face is a flat side you could stamp in paint. Don't forget the faces you can't see — the dashed lines show the back!",
        "Une face, c'est un côté plat que tu pourrais tremper dans la peinture. N'oublie pas les faces cachées — les pointillés montrent l'arrière!"),
    },
  });
}

function faceShapeQ() {
  const k = pick(['cube', 'prism', 'cylinder', 'cone']);
  const ans = SHAPES3D[k].faceShape;
  return wordQ({
    key: `faceshape-${k}`, badge: L('🎨 Paint stamp!', '🎨 Tampon de peinture!'),
    text: L(`${M} dips ${un(k)} in paint and stamps it. What shape is the stamp?`, `${M} trempe ${un(k)} dans la peinture et fait un tampon. Quelle forme a le tampon?`),
    visual: card(solidSVG(k), 'big'),
    options: sample(['circle', 'square', 'rectangle', 'triangle'], 3, ans).map(flatOpt),
    answer: ans,
    hint: { text: L(`Look at the flat face of the ${nm(k)}. What 2D shape is it?`, `Regarde la face plane ${SHAPES3D[k].g === 'f' ? 'de la' : 'du'} ${SHAPES3D[k].fr}. Quelle figure plane est-ce?`) },
  });
}

function edgesVerticesQ() {
  const k = pick(['cube', 'prism', 'pyramid', 'triprism']);
  const kind = pick(['edges', 'vertices']);
  const ans = SHAPES3D[k][kind];
  return numberQ({
    key: `${kind}-${k}`, badge: pick(BADGES()),
    text: kind === 'edges'
      ? L(`How many edges does ${un(k)} have? (An edge is where two faces meet.)`, `Combien d'arêtes a ${un(k)}? (Une arête, c'est là où deux faces se rencontrent.)`)
      : L(`How many vertices does ${un(k)} have? (A vertex is a corner point.)`, `Combien de sommets a ${un(k)}? (Un sommet, c'est un coin pointu.)`),
    visual: card(solidSVG(k), 'big'),
    answer: ans, min: 1, max: 14, near: [1, -1, 2, -2, 4, -4],
    mode: rand(0, 1) ? 'number' : 'choice',
    hint: {
      text: kind === 'edges'
        ? L('Count the lines, even the dashed ones at the back. Go slowly!', 'Compte les lignes, même les pointillés à l’arrière. Vas-y lentement!')
        : L('Count the corner points, even the hidden one at the back where the dashed lines meet.', 'Compte les coins, même celui caché à l’arrière où les pointillés se rejoignent.'),
    },
  });
}

const RIDDLES = () => [
  { k: 'cube', t: L('I have 6 flat faces. They are all squares. What am I?', "J'ai 6 faces planes. Ce sont toutes des carrés. Qui suis-je?") },
  { k: 'cone', t: L('I have 1 flat face, 1 point on top, and I can roll. What am I?', "J'ai 1 face plane, 1 pointe en haut, et je peux rouler. Qui suis-je?") },
  { k: 'cylinder', t: L('I have 2 flat circle faces and I can roll. What am I?', "J'ai 2 faces planes en forme de cercle et je peux rouler. Qui suis-je?") },
  { k: 'pyramid', t: L('I have 5 faces: 1 square and 4 triangles. What am I?', "J'ai 5 faces : 1 carré et 4 triangles. Qui suis-je?") },
  { k: 'triprism', t: L('I have 5 faces: 2 triangles and 3 rectangles. What am I?', "J'ai 5 faces : 2 triangles et 3 rectangles. Qui suis-je?") },
  { k: 'sphere', t: L('I have no flat faces, no edges and no vertices. What am I?', "Je n'ai pas de faces planes, pas d'arêtes et pas de sommets. Qui suis-je?") },
  { k: 'prism', t: L('I have 6 faces. They are rectangles, like a cereal box. What am I?', "J'ai 6 faces. Ce sont des rectangles, comme une boîte de céréales. Qui suis-je?") },
];

function riddle() {
  const r = pick(RIDDLES());
  const opts = sample(ALL, 4, r.k);
  return visualQ({
    key: `r3-${r.k}`, badge: L('🏆 Riddle round!', '🏆 Devinette!'), text: r.t,
    options: opts.map((k) => ({ value: k, html: solidSVG(k) })),
    answer: r.k, hint: factHint(r.k),
  });
}

function compareVertices() {
  const [a, b] = sample(['cube', 'pyramid', 'triprism', 'cone'], 2);
  if (SHAPES3D[a].vertices === SHAPES3D[b].vertices) return compareVertices();
  const answer = SHAPES3D[a].vertices > SHAPES3D[b].vertices ? a : b;
  const has = (k) => L(`${un(k)} has ${SHAPES3D[k].vertices}`, `${un(k)} en a ${SHAPES3D[k].vertices}`);
  const capFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return visualQ({
    key: `cmpv-${[a, b].sort().join()}`, badge: L('🥇 Gold medal question!', "🥇 Question médaille d'or!"),
    text: L('Which shape has MORE vertices (corners)?', 'Quel solide a PLUS de sommets (coins)?'),
    options: [a, b].map((k) => ({ value: k, html: solidSVG(k) })),
    answer,
    hint: { text: `${capFirst(has(a))}. ${capFirst(has(b))}. ${L('Which is more?', 'Lequel en a le plus?')}` },
  });
}

export default {
  id: 'shapes3d',
  emoji: '🤸‍♀️',
  theme: 'gym',
  color: '#ff7a1a',
  get title() { return L('Gymnastics Meet', 'La compétition de gym'); },
  get skill() { return L('3D shapes', 'Les solides'); },
  get blurb() { return L('Mats, beams and vaults — find the 3D shapes!', 'Tapis, poutres et sauts — trouve les solides!'); },
  get intro() {
    return L(`It's the big gymnastics meet! ${COACH()} needs help with all the 3D shapes in the gym.`,
      `C'est la grande compétition de gymnastique! ${COACH()} a besoin d'aide avec tous les solides du gymnase.`);
  },
  get levels() {
    return {
      mild: { kid: L('Name the 3D shapes', 'Nomme les solides'), parent: 'Identify cube, rectangular prism, sphere, cylinder, cone, pyramid; match to real objects.' },
      medium: { kid: L('Roll, stack and count faces', 'Rouler, empiler et compter les faces'), parent: 'Roll vs. slide, stacking, counting flat faces, shape of faces; adds triangular prism.' },
      spicy: { kid: L('Edges, vertices and riddles', 'Arêtes, sommets et devinettes'), parent: 'Counting edges and vertices (cube, prisms, pyramid), riddles from properties, comparing vertices.' },
    };
  },
  get praise() { return L(['Stuck the landing! 🤸‍♀️', 'Perfect 10! 🥇', 'What a cartwheel! 🤸‍♀️', 'Gold medal answer! 🏅'], ['Atterrissage parfait! 🤸‍♀️', 'Un 10 parfait! 🥇', 'Quelle belle roue! 🤸‍♀️', "Réponse médaille d'or! 🏅"]); },
  get doneTitles() { return L(['Gold medal! 🥇', 'What a routine! 🤸‍♀️', 'The judges say 10! 🏆'], ["Médaille d'or! 🥇", 'Quelle routine! 🤸‍♀️', 'Les juges donnent 10! 🏆']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([tapSolid, tapSolid, nameSolid, realWorld])(MILD);
    if (level === 'medium') return pick([() => tapSolid(ALL), () => realWorld(ALL), rollQ, stackQ, () => facesQ(ALL), faceShapeQ])();
    return pick([edgesVerticesQ, edgesVerticesQ, riddle, riddle, compareVertices, () => facesQ(ALL)])();
  },
};
