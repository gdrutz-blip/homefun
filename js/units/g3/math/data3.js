// GRADE 3 — DATA & PROBABILITY: Sports Stats 📊 / Les statistiques sportives
import { rand, pick, sample, shuffle } from '../../../util.js';
import { numberQ, wordQ } from '../../common.js';
import { barGraph, pictograph } from '../../../visuals-measure.js';
import { card } from '../../../visuals.js';
import { FAMILY3 } from '../../../config.js';
import { L } from '../../../i18n.js';

const { kid: F, sister: M, cousins } = FAMILY3;
const SPORTS = () => [
  { e: '⚽', w: L('soccer', 'soccer') }, { e: '🏀', w: L('basketball', 'basket') }, { e: '🏒', w: L('hockey', 'hockey') },
  { e: '🚲', w: L('biking', 'vélo') }, { e: '🤸‍♀️', w: L('gym', 'gym') }, { e: '💃', w: L('dance', 'danse') }, { e: '🏊', w: L('swimming', 'natation') },
];
const BADGES = () => L(['📊 Stats time!', '🏆 Favourite sport!', '📈 Graph check!', '🎯 Chance!'], ['📊 Les statistiques!', '🏆 Sport préféré!', '📈 Le graphique!', '🎯 La chance!']);
const INTRO = () => pick(L([`${F} asked the cousins and her friends to vote for their favourite sport.`, `${F} counted how many kids play each sport at school.`, `${M} and ${F} kept a tally of the sports at the cottage this summer.`],
  [`${F} a demandé aux cousins et à ses amies de voter pour leur sport préféré.`, `${F} a compté combien d’enfants jouent à chaque sport à l’école.`, `${M} et ${F} ont fait un tableau des sports au chalet cet été.`]));

function makeData(per, maxMult) {
  const sp = sample(SPORTS(), 4);
  const mults = sample(Array.from({ length: maxMult }, (_, i) => i + 1), 4);
  return sp.map((s, i) => ({ ...s, c: mults[i] * per }));
}

function howMany(type, per, maxMult, mode) {
  const d = makeData(per, maxMult), t = pick(d);
  return numberQ({
    key: `hm-${type}-${per}-${d.map((x) => x.c).join('')}-${t.e}`, badge: pick(BADGES()),
    text: `${INTRO()} ${L(`How many kids chose ${t.w}?`, `Combien d’enfants ont choisi ${t.w}?`)}`,
    visual: card(type === 'bar' ? barGraph(d, { step: per }) : pictograph(d, per)),
    answer: t.c, mode, min: 0, max: 100, near: [per, -per, 2 * per, 1, 10],
    hint: { text: type === 'bar' ? L(`Follow the top of the bar to the scale. The scale counts by ${per}s.`, `Suis le haut de la barre jusqu’à l’échelle. L’échelle compte par bonds de ${per}.`) : L(`Count the 🙋. Each 🙋 is worth ${per}, so skip count by ${per}s.`, `Compte les 🙋. Chaque 🙋 vaut ${per}, alors compte par bonds de ${per}.`) },
  });
}

function mostMore(type, per, maxMult, mode) {
  const d = makeData(per, maxMult).sort((a, b) => b.c - a.c);
  const a = d[0], b = d[rand(1, 3)];
  return numberQ({
    key: `mm-${type}-${per}-${d.map((x) => x.c).join('')}-${b.e}`, badge: pick(BADGES()),
    text: L(`How many MORE kids chose ${a.w} than ${b.w}?`, `Combien d’enfants de PLUS ont choisi ${a.w} que ${b.w}?`),
    visual: card(type === 'bar' ? barGraph(d, { step: per }) : pictograph(d, per)),
    big: `${a.c} − ${b.c} = <span class="qbox">?</span>`,
    answer: a.c - b.c, mode, min: per, max: 100, near: [per, -per, 10, -10],
    hint: { text: L(`${a.w}: ${a.c}. ${b.w}: ${b.c}. Subtract: ${a.c} − ${b.c}.`, `${a.w} : ${a.c}. ${b.w} : ${b.c}. Soustrais : ${a.c} − ${b.c}.`) },
  });
}

function total(type, per, maxMult, mode) {
  const d = makeData(per, maxMult);
  const sum = d.reduce((s, x) => s + x.c, 0);
  return numberQ({
    key: `tt-${type}-${per}-${d.map((x) => x.c).join('')}`, badge: pick(BADGES()),
    text: L('How many kids voted in all?', 'Combien d’enfants ont voté en tout?'),
    visual: card(type === 'bar' ? barGraph(d, { step: per }) : pictograph(d, per)),
    big: `${d.map((x) => x.c).join(' + ')} = <span class="qbox">?</span>`,
    answer: sum, mode, min: per, max: 200, near: [per, -per, 10, -10, 5],
    hint: { text: L('Add all the bars or rows together. Make tens or fives first!', 'Additionne toutes les barres ou rangées. Fais d’abord des dizaines ou des cinq!') },
  });
}

const CHANCE = () => ({ certain: L('Certain', 'Certain'), likely: L('Likely', 'Probable'), equal: L('Equally likely', 'Aussi probable qu’improbable'), unlikely: L('Unlikely', 'Peu probable'), impossible: L('Impossible', 'Impossible') });

function bagQ() {
  const kinds = [['🔴', L('red', 'rouge')], ['🔵', L('blue', 'bleu')], ['🟡', L('yellow', 'jaune')]];
  const [[e1, n1], [e2]] = sample(kinds, 2);
  const cases = [[8, 0, 'certain'], [7, 1, 'likely'], [3, 3, 'equal'], [1, 7, 'unlikely'], [0, 6, 'impossible'], [6, 2, 'likely'], [2, 6, 'unlikely'], [5, 5, 'equal']];
  const [a, b, ans] = pick(cases);
  const marbles = shuffle([...Array(a).fill(e1), ...Array(b).fill(e2)]).join(' ');
  const C = CHANCE();
  const opts = sample(Object.keys(C).filter((k) => k !== ans), 2).concat(ans);
  return wordQ({
    key: `bag-${e1}-${e2}-${a}-${b}`, badge: pick(BADGES()),
    text: L(`${F} pulls one marble from the bag without looking. How likely is it to be ${n1}?`, `${F} pige une bille dans le sac sans regarder. Quelle est la probabilité que ce soit ${n1}?`),
    visual: card(`<div class="marbles">${marbles || '—'}</div>`),
    options: shuffle(opts).map((k) => ({ value: k, label: C[k] })),
    answer: ans,
    hint: { text: L(`Count: ${a} are ${n1} out of ${a + b}. All of them = certain. None = impossible. More than half = likely. Fewer than half = unlikely. Half = equally likely.`, `Compte : ${a} sont ${n1} sur ${a + b}. Toutes = certain. Aucune = impossible. Plus de la moitié = probable. Moins de la moitié = peu probable. La moitié = aussi probable qu’improbable.`) },
  });
}

function mostLikely() {
  const kinds = [['🔴', L('red', 'rouge')], ['🔵', L('blue', 'bleu')], ['🟡', L('yellow', 'jaune')]];
  const counts = shuffle([1, 3, 5]);
  const marbles = shuffle(kinds.flatMap(([e], i) => Array(counts[i]).fill(e))).join(' ');
  const best = counts.indexOf(5);
  return wordQ({
    key: `ml-${counts.join('')}`, badge: pick(BADGES()),
    text: L('Which colour is MOST likely to be pulled out of the bag?', 'Quelle couleur est la PLUS probable à être piochée?'),
    visual: card(`<div class="marbles">${marbles}</div>`),
    options: kinds.map(([, n], i) => ({ value: i, label: n.charAt(0).toUpperCase() + n.slice(1) })),
    answer: best,
    hint: { text: L('The colour with the most marbles has the best chance.', 'La couleur qui a le plus de billes a la meilleure chance.') },
  });
}

export default {
  id: 'data3',
  emoji: '📊',
  theme: 'graph',
  color: '#5e35b1',
  get title() { return L('Sports Stats', 'Les statistiques sportives'); },
  get skill() { return L('Graphs & probability', 'Graphiques et probabilité'); },
  get blurb() { return L('Read bar graphs and picture graphs, and guess what is likely!', 'Lis des diagrammes et pictogrammes, et devine ce qui est probable!'); },
  get intro() {
    return L(`${F} is tracking favourite sports for the whole family. Read the graphs, then see how likely things are to happen!`,
      `${F} note les sports préférés de toute la famille. Lis les graphiques, puis découvre la probabilité que les choses arrivent!`);
  },
  get levels() {
    return {
      mild: { kid: L('Graphs that count by 5s', 'Graphiques qui comptent par 5'), parent: 'Reading bar graphs and pictographs with a scale of 5; most/fewest.' },
      medium: { kid: L('Compare and total', 'Comparer et additionner'), parent: 'Pictographs with each symbol = 5 or 10; scale of 5/10 on bar graphs; how many more; totals.' },
      spicy: { kid: L('How likely is it?', 'Quelle est la probabilité?'), parent: 'Probability vocabulary (impossible, unlikely, equally likely, likely, certain); most likely outcome; graph comparisons.' },
    };
  },
  get praise() { return L(['Stat star! 📊', 'Goal! ⚽', 'Sporty smart! 🏆'], ['Étoile des stats! 📊', 'But! ⚽', 'Sportive et brillante! 🏆']); },
  get doneTitles() { return L(['Stats complete! 📊', 'Graph champion! 🏆'], ['Statistiques terminées! 📊', 'Championne des graphiques! 🏆']); },
  makeQuestion(level, i) {
    const mode = i % 2 ? 'number' : 'choice';
    if (level === 'mild') return pick([() => howMany('bar', 5, 8, 'choice'), () => howMany('pict', 5, 6, 'choice'), () => howMany('bar', 5, 8, 'choice')])();
    if (level === 'medium') return pick([() => mostMore('pict', 5, 8, mode), () => total('pict', 10, 6, mode), () => mostMore('bar', 5, 8, mode), () => howMany('pict', 10, 6, mode)])();
    return pick([bagQ, bagQ, bagQ, mostLikely, () => total('bar', 5, 8, mode)])();
  },
};
