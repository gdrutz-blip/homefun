// SCIENCE — Properties of Liquids and Solids: Mia's Chocolate Kitchen 🍫 / La cuisine chocolatée de Mia
import { pick, sample, shuffle } from '../../util.js';
import { wordQ, emojiQ } from '../common.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F } = FAMILY;

const SOLIDS = [
  { e: '🧊', n: ['an ice cube', 'un glaçon'] },
  { e: '🍫', n: ['a chocolate bar', 'une tablette de chocolat'] },
  { e: '🥄', n: ['a spoon', 'une cuillère'] },
  { e: '🪨', n: ['a rock', 'une roche'] },
  { e: '🧸', n: ['a teddy bear', 'un ourson en peluche'] },
  { e: '🍎', n: ['an apple', 'une pomme'] },
  { e: '🧈', n: ['a block of butter', 'un bloc de beurre'] },
  { e: '🥕', n: ['a carrot', 'une carotte'] },
  { e: '🍪', n: ['a cookie', 'un biscuit'] },
];
const LIQUIDS = [
  { e: '🥛', n: ['milk', 'du lait'] },
  { e: '💧', n: ['water', 'de l’eau'] },
  { e: '🧃', n: ['juice', 'du jus'] },
  { e: '🍯', n: ['honey', 'du miel'] },
  { e: '🍵', n: ['tea', 'du thé'] },
  { e: '🫗', n: ['syrup', 'du sirop'] },
];
const nm = (x) => L(...x.n);

const FLOATS = [
  { e: '🍎', n: ['an apple', 'une pomme'] }, { e: '🍃', n: ['a leaf', 'une feuille'] },
  { e: '🪵', n: ['a piece of wood', 'un morceau de bois'] }, { e: '🧽', n: ['a sponge', 'une éponge'] },
  { e: '🎈', n: ['a balloon', 'un ballon gonflé'] }, { e: '🪶', n: ['a feather', 'une plume'] },
];
const SINKS = [
  { e: '🪨', n: ['a rock', 'une roche'] }, { e: '🪙', n: ['a coin', 'une pièce de monnaie'] },
  { e: '🔑', n: ['a key', 'une clé'] }, { e: '⚓', n: ['an anchor', 'une ancre'] },
  { e: '🥄', n: ['a metal spoon', 'une cuillère en métal'] }, { e: '🔩', n: ['a bolt', 'un boulon'] },
];
const DISSOLVES = [
  { e: '🧂', n: ['salt', 'le sel'] }, { e: '🍬', n: ['sugar', 'le sucre'] }, { e: '🍫', n: ['hot chocolate powder', 'la poudre de chocolat chaud'] },
];
const NO_DISSOLVE = [
  { e: '🏖️', n: ['sand', 'le sable'] }, { e: '🪨', n: ['pebbles', 'les cailloux'] }, { e: '🔮', n: ['marbles', 'les billes'] }, { e: '🥄', n: ['a spoon', 'une cuillère'] },
];

const BADGES = () => L(['🍫 Chocolate lab!', '👩‍🍳 Kitchen science!', '🧪 Experiment time!'], ['🍫 Labo chocolat!', '👩‍🍳 Science en cuisine!', '🧪 L’heure de l’expérience!']);
const SL = () => [{ value: 'solid', label: L('solid', 'solide') }, { value: 'liquid', label: L('liquid', 'liquide') }];

function solidOrLiquid() {
  const isSolid = Math.random() < 0.5;
  const it = pick(isSolid ? SOLIDS : LIQUIDS);
  return wordQ({
    key: `sl-${it.e}`, badge: pick(BADGES()),
    text: L(`Is ${nm(it)} a solid or a liquid?`, `Est-ce que ${nm(it)}, c'est un solide ou un liquide?`),
    visual: card(`<span class="big-emoji">${it.e}</span>`),
    options: SL(),
    answer: isSolid ? 'solid' : 'liquid',
    hint: {
      text: L('A solid keeps its own shape. A liquid flows and you can pour it.', 'Un solide garde sa forme. Un liquide coule et on peut le verser.'),
    },
  });
}

function pickOne() {
  const wantLiquid = Math.random() < 0.5;
  const target = pick(wantLiquid ? LIQUIDS : SOLIDS);
  const others = sample(wantLiquid ? SOLIDS : LIQUIDS, 3);
  return emojiQ({
    key: `pick-${wantLiquid}-${target.e}`, badge: pick(BADGES()),
    text: wantLiquid ? L('Tap the LIQUID.', 'Touche le LIQUIDE.') : L('Tap the SOLID.', 'Touche le SOLIDE.'),
    options: shuffle([target, ...others]).map((x) => ({ value: x.e, e: x.e, say: nm(x) })),
    answer: target.e,
    revealSay: nm(target),
    hint: { text: L('Which one could you pour into a cup?', 'Lequel pourrais-tu verser dans une tasse?') },
  });
}

const CHANGES = () => [
  { t: L(`${M} heats a chocolate bar in a pot. What happens?`, `${M} chauffe une tablette de chocolat dans une casserole. Que se passe-t-il?`), e: '🍫🔥', a: 'melt' },
  { t: L(`${F} puts juice in the freezer. What happens?`, `${F} met du jus au congélateur. Que se passe-t-il?`), e: '🧃❄️', a: 'freeze' },
  { t: L('An ice cream cone sits in the hot sun. What happens?', 'Un cornet de crème glacée reste au soleil. Que se passe-t-il?'), e: '🍦☀️', a: 'melt' },
  { t: L('Water goes into an ice cube tray in the freezer. What happens?', 'On met de l’eau dans un bac à glaçons au congélateur. Que se passe-t-il?'), e: '💧❄️', a: 'freeze' },
  { t: L('Butter is warmed in a frying pan. What happens?', 'Le beurre chauffe dans une poêle. Que se passe-t-il?'), e: '🧈🔥', a: 'melt' },
  { t: L('Melted chocolate goes into the fridge. What happens?', 'Le chocolat fondu va au réfrigérateur. Que se passe-t-il?'), e: '🍫❄️', a: 'freeze' },
];
const CHANGE_OPTS = () => [
  { value: 'melt', label: L('It melts into a liquid', 'Il fond et devient liquide') },
  { value: 'freeze', label: L('It hardens into a solid', 'Il durcit et devient solide') },
  { value: 'same', label: L('Nothing changes', 'Rien ne change') },
];

function heatCool() {
  const c = pick(CHANGES());
  return wordQ({
    key: `chg-${c.e}`, badge: L('🔥❄️ Hot or cold!', '🔥❄️ Chaud ou froid!'), text: c.t,
    visual: card(`<span class="big-emoji">${c.e}</span>`),
    options: CHANGE_OPTS(), answer: c.a,
    hint: { text: L('Heat makes solids melt. Cold makes liquids freeze into solids.', 'La chaleur fait fondre les solides. Le froid fait geler les liquides.') },
  });
}

const FACTS = () => [
  {
    t: L('Mia pours milk from a jug into a glass. What shape is the milk now?', 'Mia verse du lait d’un pichet dans un verre. Quelle forme a le lait maintenant?'),
    opts: [L('The shape of the glass', 'La forme du verre'), L('The shape of the jug', 'La forme du pichet'), L('A square', 'Un carré')], a: 0,
    hint: L('A liquid takes the shape of its container.', 'Un liquide prend la forme de son contenant.'),
  },
  {
    t: L('You put a block in a bowl. What shape is the block now?', 'Tu mets un bloc dans un bol. Quelle forme a le bloc maintenant?'),
    opts: [L('It keeps its own shape', 'Il garde sa forme'), L('The shape of the bowl', 'La forme du bol'), L('It becomes flat', 'Il devient plat')], a: 0,
    hint: L('A solid keeps its own shape wherever you put it.', 'Un solide garde sa forme partout.'),
  },
  {
    t: L('Which one can you POUR?', 'Lequel peut-on VERSER?'),
    opts: [L('Juice', 'Le jus'), L('A cookie', 'Un biscuit'), L('A spoon', 'Une cuillère')], a: 0,
    hint: L('Liquids flow, so you can pour them.', 'Les liquides coulent, alors on peut les verser.'),
  },
];

function fact() {
  const f = pick(FACTS());
  return wordQ({
    key: `fact-${f.t.slice(0, 12)}`, badge: pick(BADGES()), text: f.t,
    options: f.opts.map((o, i) => ({ value: i, label: o })), answer: f.a,
    hint: { text: f.hint },
  });
}

function sinkFloat() {
  const floats = Math.random() < 0.5;
  const it = pick(floats ? FLOATS : SINKS);
  return wordQ({
    key: `sf-${it.e}`, badge: L('🛁 Sink or float?', '🛁 Coule ou flotte?'),
    text: L(`${M} drops ${nm(it)} into a tub of water. Will it sink or float?`, `${M} met ${nm(it)} dans un bac d’eau. Est-ce que ça coule ou ça flotte?`),
    visual: card(`<span class="big-emoji">${it.e}</span>`),
    options: [{ value: 'float', label: L('It floats', 'Ça flotte') }, { value: 'sink', label: L('It sinks', 'Ça coule') }],
    answer: floats ? 'float' : 'sink',
    hint: { text: L('Light things and things with air inside often float. Heavy metal and stone things sink.', 'Les objets légers ou remplis d’air flottent souvent. Les objets en métal ou en pierre coulent.') },
  });
}

function dissolve() {
  const yes = Math.random() < 0.5;
  const target = pick(yes ? DISSOLVES : NO_DISSOLVE);
  const others = sample(yes ? NO_DISSOLVE : DISSOLVES, yes ? 2 : 2).filter((x) => x.e !== target.e);
  return emojiQ({
    key: `dis-${yes}-${target.e}`, badge: L('🥄 Stir it!', '🥄 Brasse!'),
    text: yes
      ? L('Which one will DISSOLVE (disappear) when you stir it into warm water?', 'Lequel va se DISSOUDRE (disparaître) si tu le brasses dans l’eau tiède?')
      : L('Which one will NOT dissolve in water? It stays at the bottom.', 'Lequel ne va PAS se dissoudre dans l’eau? Il reste au fond.'),
    options: shuffle([target, ...others]).map((x) => ({ value: x.e, e: x.e, say: L(...x.n) })),
    answer: target.e,
    revealSay: L(...target.n),
    hint: { text: L('Salt, sugar and hot chocolate powder dissolve. Sand and stones do not.', 'Le sel, le sucre et la poudre de chocolat se dissolvent. Le sable et les cailloux, non.') },
  });
}

export default {
  id: 'matter',
  emoji: '🍫',
  theme: 'kitchen',
  color: '#8d5524',
  get title() { return L(`${M}'s Chocolate Kitchen`, `La cuisine chocolatée de ${M}`); },
  get skill() { return L('Solids & liquids', 'Les solides et les liquides'); },
  get blurb() { return L('Melt chocolate, freeze juice and do kitchen experiments!', 'Fais fondre du chocolat, geler du jus et des expériences!'); },
  get intro() {
    return L(`${M} and ${F} are doing science in the kitchen! Let's find out about solids and liquids.`,
      `${M} et ${F} font de la science dans la cuisine! Découvrons les solides et les liquides.`);
  },
  get levels() {
    return {
      mild: { kid: L('Solid or liquid?', 'Solide ou liquide?'), parent: 'Classifying everyday objects as solids or liquids.' },
      medium: { kid: L('Melting, freezing and pouring', 'Fondre, geler et verser'), parent: 'Effects of heating/cooling (melting, freezing); liquids take the shape of their container.' },
      spicy: { kid: L('Sink, float and dissolve', 'Couler, flotter et dissoudre'), parent: 'Predicting sink/float; which solids dissolve in water; mixed review.' },
    };
  },
  get praise() { return L(['Choc-tastic! 🍫', 'Super scientist! 🧪', 'Yummy science! 😋'], ['Chocolat-tastique! 🍫', 'Super scientifique! 🧪', 'Science délicieuse! 😋']); },
  get doneTitles() { return L(['Experiment complete! 🧪', 'Kitchen scientist! 👩‍🍳'], ['Expérience terminée! 🧪', 'Scientifique en cuisine! 👩‍🍳']); },
  makeQuestion(level) {
    if (level === 'mild') return pick([solidOrLiquid, solidOrLiquid, pickOne])();
    if (level === 'medium') return pick([heatCool, heatCool, fact, pickOne])();
    return pick([sinkFloat, sinkFloat, dissolve, dissolve, heatCool])();
  },
};
