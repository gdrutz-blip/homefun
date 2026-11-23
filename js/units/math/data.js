// GRADE 2 — DATA & GRAPHS: Ice Cream Vote 🗳️ / Le vote des saveurs
import { rand, pick, sample, shuffle } from '../../util.js';
import { numberQ, wordQ } from '../common.js';
import { barGraph, pictograph } from '../../visuals-measure.js';
import { card } from '../../visuals.js';
import { FAMILY } from '../../config.js';
import { L } from '../../i18n.js';

const { kid: M, bigSister: F } = FAMILY;
const FLAVOURS = () => [
  { e: '🍫', w: L('chocolate', 'chocolat') }, { e: '🍓', w: L('strawberry', 'fraise') }, { e: '🍦', w: L('vanilla', 'vanille') },
  { e: '🫐', w: L('blueberry', 'bleuet') }, { e: '🥭', w: L('mango', 'mangue') }, { e: '🍌', w: L('banana', 'banane') }, { e: '🍪', w: L('cookie', 'biscuit') },
];
const BADGES = () => L(['🗳️ Vote count!', '🍦 Flavour vote!', '📊 Graph time!', '🍨 Ice cream poll!'], ['🗳️ On compte les votes!', '🍦 Vote des saveurs!', '📊 L’heure du graphique!', '🍨 Sondage de crème glacée!']);
const INTRO = () => pick(L([`${M} asked her friends at the gym to vote for their favourite flavour.`, `${F} asked the cousins to vote for their favourite flavour.`, `Everyone at the cottage voted for their favourite flavour.`],
  [`${M} a demandé à ses amies du gym de voter pour leur saveur préférée.`, `${F} a demandé aux cousins de voter pour leur saveur préférée.`, `Tout le monde au chalet a voté pour sa saveur préférée.`]));

/** 4 flavours with different counts. */
function makeData(maxC, per) {
  const fl = sample(FLAVOURS(), 4);
  const pool = sample(Array.from({ length: Math.floor(maxC / per) }, (_, i) => (i + 1) * per), 4);
  return fl.map((f, i) => ({ ...f, c: pool[i] }));
}

function show(data, type, per) {
  return card(type === 'bar' ? barGraph(data, { step: per }) : pictograph(data, per));
}

function howMany(type, per, maxC, mode) {
  const d = makeData(maxC, per), t = pick(d);
  return numberQ({
    key: `hm-${type}-${d.map((x) => x.c).join('')}-${t.e}`, badge: pick(BADGES()),
    text: `${INTRO()} ${L(`How many kids chose ${t.w}?`, `Combien d’enfants ont choisi ${t.w}?`)}`,
    visual: show(d, type, per),
    answer: t.c, mode, min: 0, max: 20, near: [per, -per, 1, -1, 2],
    hint: { text: type === 'bar' ? L('Find the bar. Follow the top of it across to the numbers on the left.', 'Trouve la barre. Suis le haut de la barre jusqu’aux nombres à gauche.') : L(`Count the 🙋 in the row. Each 🙋 is worth ${per}.`, `Compte les 🙋 dans la rangée. Chaque 🙋 vaut ${per}.`) },
  });
}

function mostLeast(type, per, maxC) {
  const d = makeData(maxC, per);
  const most = Math.random() < 0.5;
  const t = d.reduce((a, b) => ((most ? b.c > a.c : b.c < a.c) ? b : a));
  return wordQ({
    key: `ml-${type}-${most}-${d.map((x) => x.c).join('')}`, badge: pick(BADGES()),
    text: `${INTRO()} ${most ? L('Which flavour got the MOST votes?', 'Quelle saveur a reçu le PLUS de votes?') : L('Which flavour got the FEWEST votes?', 'Quelle saveur a reçu le MOINS de votes?')}`,
    visual: show(d, type, per),
    options: shuffle(d.map((x) => ({ value: x.w, label: `${x.e} ${x.w}`, say: x.w }))),
    answer: t.w,
    hint: { text: most ? L('Look for the tallest bar, or the longest row.', 'Cherche la barre la plus haute ou la rangée la plus longue.') : L('Look for the shortest bar, or the shortest row.', 'Cherche la barre la plus courte ou la rangée la plus courte.') },
  });
}

function moreThan(type, per, maxC, mode) {
  const d = makeData(maxC, per).sort((a, b) => b.c - a.c);
  const [a, b] = [d[0], d[rand(1, 3)]];
  return numberQ({
    key: `mt-${type}-${d.map((x) => x.c).join('')}-${a.e}${b.e}`, badge: pick(BADGES()),
    text: `${L(`How many MORE kids chose ${a.w} than ${b.w}?`, `Combien d’enfants de PLUS ont choisi ${a.w} que ${b.w}?`)}`,
    visual: show(d, type, per),
    big: `${a.c} − ${b.c} = <span class="qbox">?</span>`,
    answer: a.c - b.c, mode, min: 1, max: 20, near: [per, -per, 1, -1, 2],
    hint: { text: L(`${a.w}: ${a.c}. ${b.w}: ${b.c}. Subtract: ${a.c} − ${b.c}.`, `${a.w} : ${a.c}. ${b.w} : ${b.c}. Soustrais : ${a.c} − ${b.c}.`) },
  });
}

function total(type, per, maxC, mode) {
  const d = makeData(maxC, per);
  const sum = d.reduce((s, x) => s + x.c, 0);
  return numberQ({
    key: `tot-${type}-${d.map((x) => x.c).join('')}`, badge: pick(BADGES()),
    text: L('How many kids voted in all?', 'Combien d’enfants ont voté en tout?'),
    visual: show(d, type, per),
    big: `${d.map((x) => x.c).join(' + ')} = <span class="qbox">?</span>`,
    answer: sum, mode, min: 1, max: 50, near: [per, -per, 10, -10, 1],
    hint: { text: L('Add up all the bars or rows. Try making tens first!', 'Additionne toutes les barres ou rangées. Essaie de faire des dizaines d’abord!') },
  });
}

export default {
  id: 'data',
  emoji: '📊',
  theme: 'graph',
  color: '#6a1b9a',
  get title() { return L('Ice Cream Vote', 'Le vote des saveurs'); },
  get skill() { return L('Graphs', 'Les graphiques'); },
  get blurb() { return L('Read picture graphs and bar graphs about ice cream flavours!', 'Lis des pictogrammes et des diagrammes à barres sur les saveurs de crème glacée!'); },
  get intro() {
    return L(`Which ice cream flavour is the favourite? ${M} counted the votes and made graphs. Can you read them?`,
      `Quelle saveur de crème glacée est la préférée? ${M} a compté les votes et fait des graphiques. Sais-tu les lire?`);
  },
  get levels() {
    return {
      mild: { kid: L('Picture graphs', 'Les pictogrammes'), parent: 'Reading pictographs where each symbol = 1; counting, most, fewest.' },
      medium: { kid: L('Bar graphs', 'Les diagrammes à barres'), parent: 'Reading bar graphs (scale by 2s); how many chose X; most and fewest.' },
      spicy: { kid: L('How many more? How many in all?', 'Combien de plus? Combien en tout?'), parent: 'Pictographs where each symbol = 2; comparing categories (subtraction) and totals (addition).' },
    };
  },
  get praise() { return L(['Sweet graph! 🍦', 'Data detective! 🔎', 'Great counting! 📊'], ['Beau graphique! 🍦', 'Détective des données! 🔎', 'Bien compté! 📊']); },
  get doneTitles() { return L(['Votes counted! 🗳️', 'Graph genius! 📊'], ['Votes comptés! 🗳️', 'Génie des graphiques! 📊']); },
  makeQuestion(level, i) {
    const mode = i % 2 ? 'number' : 'choice';
    if (level === 'mild') return pick([() => howMany('pict', 1, 8, 'choice'), () => mostLeast('pict', 1, 8)])();
    if (level === 'medium') return pick([() => howMany('bar', 1, 10, mode), () => mostLeast('bar', 1, 10), () => howMany('bar', 1, 10, 'choice')])();
    return pick([() => moreThan('pict', 2, 12, mode), () => total('pict', 2, 12, mode), () => moreThan('bar', 1, 10, mode), () => howMany('pict', 2, 12, mode)])();
  },
};
