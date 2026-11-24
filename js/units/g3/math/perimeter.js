// GRADE 3 — PERIMETER & AREA: Room Organizer Pro 🧹 / Experte du rangement
import { rand, pick, shuffle } from '../../../util.js';
import { numberQ, wordQ } from '../../common.js';
import { rectSVG } from '../../../visuals-measure.js';
import { card } from '../../../visuals.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, uncle, uncleFr } = FAMILY3;
const BADGES = () => L(['🧹 Organize it!', '📐 Measure up!', '🛏️ Room layout!', '🌳 Garden plan!'], ['🧹 On range!', '📐 On mesure!', '🛏️ Plan de chambre!', '🌳 Plan du jardin!']);
const SQ = (n) => L(`${n} square ${n === 1 ? 'unit' : 'units'}`, `${n} ${n === 1 ? 'unité carrée' : 'unités carrées'}`);

function areaCount(maxW, maxH, mode) {
  const w = rand(2, maxW), h = rand(2, maxH);
  return numberQ({
    key: `ac-${w}x${h}`, badge: pick(BADGES()),
    text: L(`${F} is covering the floor with square rugs. Each rug is 1 square unit. How many rugs cover this floor? (area)`, `${F} couvre le plancher avec des tapis carrés. Chaque tapis fait 1 unité carrée. Combien de tapis couvrent ce plancher? (aire)`),
    visual: card(rectSVG(w, h, { grid: true, label: false })),
    answer: w * h, mode, max: 100, min: 1, near: [w, -w, h, -h, 1, -1],
    hint: { text: L(`Count the squares row by row: ${h} rows of ${w}. Or multiply ${w} × ${h}.`, `Compte les carrés rangée par rangée : ${h} rangées de ${w}. Ou multiplie ${w} × ${h}.`) },
  });
}

function perimQ(maxW, maxH, mode, grid) {
  const w = rand(2, maxW), h = rand(2, maxH);
  const place = pick([
    [L('the cottage garden', 'le jardin du chalet'), L('fence', 'clôture')],
    [L('a picture frame', 'un cadre'), L('ribbon', 'ruban')],
    [L('her bedroom floor', 'le plancher de sa chambre'), L('baseboard', 'plinthe')],
  ]);
  return numberQ({
    key: `p-${w}x${h}-${place[0]}`, badge: pick(BADGES()),
    text: L(`${F} wants to put ${place[1]} all the way around ${place[0]}. How long must it be? (perimeter)`, `${F} veut mettre une ${place[1]} tout autour de ${place[0]}. Quelle longueur faut-il? (périmètre)`),
    visual: card(rectSVG(w, h, { grid, all4: true, unit: 'm' })),
    answer: 2 * (w + h), mode, max: 60, min: 4, near: [w, h, 2, -2, w + h],
    hint: { text: L(`Perimeter is the distance around. Add all 4 sides: ${w} + ${h} + ${w} + ${h}.`, `Le périmètre est la distance autour. Additionne les 4 côtés : ${w} + ${h} + ${w} + ${h}.`) },
  });
}

function areaFormula(maxW, maxH, mode) {
  const w = rand(3, maxW), h = rand(3, maxH);
  return numberQ({
    key: `af-${w}x${h}`, badge: pick(BADGES()),
    text: L(`${F} and ${M} want to cover the floor of ${uncle}'s sleeping loft with carpet squares (1 m each side). How many squares? (area)`, `${F} et ${M} veulent couvrir le plancher de la mezzanine de ${uncleFr} avec des carrés de tapis (1 m de côté). Combien de carrés? (aire)`),
    visual: card(rectSVG(w, h, { grid: false, unit: 'm' })),
    big: `${w} × ${h} = <span class="qbox">?</span>`,
    answer: w * h, mode, max: 150, min: 4, near: [w, h, 2 * (w + h), 1, -1],
    hint: { text: L(`Area = length × width. ${w} × ${h}.`, `Aire = longueur × largeur. ${w} × ${h}.`) },
  });
}

function missingSide(mode) {
  const w = rand(3, 9), h = rand(2, 8);
  const P = 2 * (w + h);
  return numberQ({
    key: `ms-${w}-${h}`, badge: L('🔍 Missing side!', '🔍 Côté manquant!'),
    text: L(`A rectangle garden has a perimeter of ${P} m. One side is ${w} m long. How long is the next side?`, `Un jardin rectangulaire a un périmètre de ${P} m. Un côté mesure ${w} m. Combien mesure le côté suivant?`),
    answer: h, mode, max: 20, min: 1, near: [1, -1, 2, -2, w],
    hint: { text: L(`Two sides of ${w} make ${2 * w}. ${P} − ${2 * w} = ${P - 2 * w}, and that is two equal sides. Half of it is ${h}.`, `Deux côtés de ${w} font ${2 * w}. ${P} − ${2 * w} = ${P - 2 * w}, ce sont deux côtés égaux. La moitié donne ${h}.`) },
  });
}

function samePerimeter() {
  const total = rand(8, 12);
  let a = rand(1, Math.floor(total / 2) - 1), b = rand(a + 1, Math.floor(total / 2));
  const [w1, h1] = [a, total - a], [w2, h2] = [b, total - b];
  if (w1 * h1 === w2 * h2) return samePerimeter();
  const bigger = w1 * h1 > w2 * h2 ? 'A' : 'B';
  return wordQ({
    key: `sp-${w1}-${w2}-${total}`, badge: L('🤔 Tricky!', '🤔 Un piège!'),
    text: L('Both rugs have the SAME perimeter. Which rug covers MORE floor (bigger area)?', 'Les deux tapis ont le MÊME périmètre. Lequel couvre PLUS de plancher (plus grande aire)?'),
    visual: `<div class="coins"><div><b>A</b>${rectSVG(w1, h1, { grid: true, unit: 'm' })}</div><div><b>B</b>${rectSVG(w2, h2, { grid: true, unit: 'm' })}</div></div>`,
    options: [{ value: 'A', label: L('Rug A', 'Le tapis A') }, { value: 'B', label: L('Rug B', 'Le tapis B') }],
    answer: bigger,
    hint: { text: L(`Count the squares. A has ${w1 * h1}. B has ${w2 * h2}. Shapes closer to a square cover more.`, `Compte les carrés. A en a ${w1 * h1}. B en a ${w2 * h2}. Les formes plus près d’un carré couvrent plus.`) },
  });
}

export default {
  id: 'perimeter',
  emoji: '🧹',
  theme: 'measure',
  color: '#00897b',
  get title() { return L('Room Organizer Pro', 'Experte du rangement'); },
  get skill() { return L('Perimeter & area', 'Périmètre et aire'); },
  get blurb() { return L('Fence the garden, cover the floor, plan the perfect room!', 'Clôture le jardin, couvre le plancher, planifie la chambre parfaite!'); },
  get intro() {
    return L(`${F} loves organizing! Today she is planning rugs, fences and room layouts. Let's measure around and inside!`,
      `${F} adore ranger! Aujourd’hui, elle planifie des tapis, des clôtures et des plans de chambre. Mesurons autour et à l’intérieur!`);
  },
  get levels() {
    return {
      mild: { kid: L('Count the squares', 'Compte les carrés'), parent: 'Area by counting unit squares; perimeter of small rectangles with a grid.' },
      medium: { kid: L('Perimeter and area', 'Périmètre et aire'), parent: 'Perimeter of rectangles by adding sides (to 10 m); area of rectangles by counting or multiplying.' },
      spicy: { kid: L('Missing sides and tricky shapes', 'Côtés manquants et formes pièges'), parent: 'Finding a missing side from the perimeter; comparing areas of rectangles with equal perimeters; larger areas.' },
    };
  },
  get praise() { return L(['Perfectly organized! 🧹', 'Measured! 📐', 'Neat and tidy! 🛏️'], ['Parfaitement rangé! 🧹', 'Bien mesuré! 📐', 'Propre et ordonné! 🛏️']); },
  get doneTitles() { return L(['Room organized! 🧹', 'Measuring master! 📐'], ['Chambre rangée! 🧹', 'Maîtresse de la mesure! 📐']); },
  makeQuestion(level, i) {
    const mode = i % 2 ? 'number' : 'choice';
    if (level === 'mild') return pick([() => areaCount(5, 4, 'choice'), () => areaCount(5, 4, 'choice'), () => perimQ(5, 4, 'choice', true)])();
    if (level === 'medium') return pick([() => perimQ(10, 8, mode, false), () => areaCount(6, 5, mode), () => areaFormula(8, 7, mode), () => perimQ(8, 6, mode, true)])();
    return pick([() => missingSide(mode), samePerimeter, () => areaFormula(12, 9, mode), () => perimQ(15, 12, mode, false)])();
  },
};
